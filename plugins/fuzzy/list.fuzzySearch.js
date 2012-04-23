/**
 * Locate the best instance of 'pattern' in 'text' using the Bitap algorithm.
 *
 * This method is a based on: Diff Match and Patch
 * http://code.google.com/p/google-diff-match-patch/
 * Author: fraser@google.com (Neil Fraser)
 * Modifications by: l.vanegeraat@gmail.com (Luuk van Egeraat)
 * Plugin by: jonny.stromberg@gmail.com (Jonny Strömberg / @javve)
 *
 * Licensed under the Apache License
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

List.prototype.plugins.fuzzySearch = function(locals, options) {
    var self = this;
    var searchFunction = function(text, pattern, options) {
        // Aproximately where in the text is the pattern expected to be found?
        var Match_Location = options.location || 0;

        //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
        var Match_Distance = options.distance || 100;

        // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.
        var Match_Threshold = options.threshold || 0.4;

        if (pattern === text) return true; // Exact match
        if (pattern.length > 32) return false; // This algorithm cannot be used

        // Set starting location at beginning text and initialise the alphabet.
        var loc = Match_Location,
            s = (function() {
                var q = {};

                for (var i = 0; i < pattern.length; i++) {
                    q[pattern.charAt(i)] = 0;
                }

                for (var i = 0; i < pattern.length; i++) {
                    q[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
                }

                return q;
            }());

        // Compute and return the score for a match with e errors and x location.
        // Accesses loc and pattern through being a closure.

        function match_bitapScore_(e, x) {
            var accuracy = e / pattern.length,
                proximity = Math.abs(loc - x);

            if (!Match_Distance) {
                // Dodge divide by zero error.
                return proximity ? 1.0 : accuracy;
            }
            return accuracy + (proximity / Match_Distance);
        }

        var score_threshold = Match_Threshold, // Highest score beyond which we give up.
            best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

        if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
            // What about in the other direction? (speedup)
            best_loc = text.lastIndexOf(pattern, loc + pattern.length);

            if (best_loc != -1) {
                score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
            }
        }

        // Initialise the bit arrays.
        var matchmask = 1 << (pattern.length - 1);
        best_loc = -1;

        var bin_min, bin_mid;
        var bin_max = pattern.length + text.length;
        var last_rd;
        for (var d = 0; d < pattern.length; d++) {
            // Scan for the best match; each iteration allows for one more error.
            // Run a binary search to determine how far from 'loc' we can stray at this
            // error level.
            bin_min = 0;
            bin_mid = bin_max;
            while (bin_min < bin_mid) {
                if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
                    bin_min = bin_mid;
                } else {
                    bin_max = bin_mid;
                }
                bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
            }
            // Use the result from this iteration as the maximum for the next.
            bin_max = bin_mid;
            var start = Math.max(1, loc - bin_mid + 1);
            var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

            var rd = Array(finish + 2);
            rd[finish + 1] = (1 << d) - 1;
            for (var j = finish; j >= start; j--) {
                // The alphabet (s) is a sparse hash, so the following line generates
                // warnings.
                var charMatch = s[text.charAt(j - 1)];
                if (d === 0) {    // First pass: exact match.
                    rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
                } else {    // Subsequent passes: fuzzy match.
                    rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                                    (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                                    last_rd[j + 1];
                }
                if (rd[j] & matchmask) {
                    var score = match_bitapScore_(d, j - 1);
                    // This match will almost certainly be better than any existing match.
                    // But check anyway.
                    if (score <= score_threshold) {
                        // Told you so.
                        score_threshold = score;
                        best_loc = j - 1;
                        if (best_loc > loc) {
                            // When passing loc, don't exceed our current distance from loc.
                            start = Math.max(1, 2 * loc - best_loc);
                        } else {
                            // Already passed loc, downhill from here on in.
                            break;
                        }
                    }
                }
            }
            // No hope for a (better) match at greater error levels.
            if (match_bitapScore_(d + 1, loc) > score_threshold) {
                break;
            }
            last_rd = rd;
        }
        return (best_loc < 0) ? false : true;
    };


    return (function() {
        var func = function(searchString, columns) {
            self.i = 1; // Reset paging
            var searchArguments,
                foundArgument,
                matching = [],
                found,
                item,
                text,
                values,
                is,
                multiSearch = (typeof options.multiSearch !== 'boolean') ? true : options.multiSearch,
                columns = (columns === undefined) ? self.items[0].values() : columns,
                searchString = (searchString === undefined) ? "" : searchString,
                target = searchString.target || searchString.srcElement; /* IE have srcElement */

            searchString = (target === undefined) ? (""+searchString).toLowerCase() : ""+target.value.toLowerCase();
            is = self.items;

            // Substract arguments from the searchString or put searchString as only argument
            searchArguments = multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

            locals.templater.clear();
            if (searchString === "") {
                locals.reset.search();
                self.searched = false;
                self.update();
            } else {
                self.searched = true;

                for (var k = 0, kl = is.length; k < kl; k++) {
                    found = true;
                    item = is[k];
                    values = item.values();

                    for(var i = 0; i < searchArguments.length; i++) {
                        foundArgument = false;

                        for(var j in columns) {
                            if(values.hasOwnProperty(j) && columns[j] !== null) {
                                text = (values[j] != null) ? values[j].toString().toLowerCase() : "";
                                if (searchFunction(text, searchArguments[i], options)) {
                                    foundArgument = true;
                                }
                            }
                        }
                        if(!foundArgument) found = false;
                    }
                    if (found) {
                        item.found = true;
                        matching.push(item);
                    } else {
                        item.found = false;
                    }
                }
                self.update();
            }
            return self.visibleItems;
        },
        timeout;

        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, 100);
        };
    }());
};