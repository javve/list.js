const $ = require('jquery'),
  fixture = require('./fixtures');

describe('Sort', function() {

  var list, i1, i2, i3, i4, i5, i6;

  beforeEach(function() {
    list = fixture.list(['id'], [
      { id: "1", val: "" },
      { id: "2", val: "" },
      { id: "3", val: "" },
      { id: "4", val: "" },
      { id: "5", val: "" },
      { id: "6", val: "" }
    ]);
    i1 = list.get('id', '1')[0];
    i2 = list.get('id', '2')[0];
    i3 = list.get('id', '3')[0];
    i4 = list.get('id', '4')[0];
    i5 = list.get('id', '5')[0];
    i6 = list.get('id', '6')[0];
  });

  afterEach(function() {
    fixture.removeList();
  });

  describe('Basics', function() {
    it('should sort letters asc', function() {
      i1.values({ val: "b" });
      i2.values({ val: "a" });
      i3.values({ val: "c" });
      i4.values({ val: "z" });
      i5.values({ val: "s" });
      i6.values({ val: "y" });
      list.sort('val');
      expect(list.items[0].values().val).toBe("a");
      expect(list.items[1].values().val).toBe("b");
      expect(list.items[2].values().val).toBe("c");
      expect(list.items[3].values().val).toBe("s");
      expect(list.items[4].values().val).toBe("y");
      expect(list.items[5].values().val).toBe("z");
    });
    it('should sort letters desc', function() {
      i1.values({ val: "b" });
      i2.values({ val: "a" });
      i3.values({ val: "c" });
      i4.values({ val: "z" });
      i5.values({ val: "s" });
      i6.values({ val: "y" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).toBe("z");
      expect(list.items[1].values().val).toBe("y");
      expect(list.items[2].values().val).toBe("s");
      expect(list.items[3].values().val).toBe("c");
      expect(list.items[4].values().val).toBe("b");
      expect(list.items[5].values().val).toBe("a");
    });
    it('should sort åäö desc', function() {
      list.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖabcdefghijklmnopqrstuvxyzåäö';
      i1.values({ val: "a" });
      i2.values({ val: "å" });
      i3.values({ val: "ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "o" });
      i6.values({ val: "s" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).toBe("ö");
      expect(list.items[1].values().val).toBe("ä");
      expect(list.items[2].values().val).toBe("å");
      expect(list.items[3].values().val).toBe("s");
      expect(list.items[4].values().val).toBe("o");
      expect(list.items[5].values().val).toBe("a");
    });
    it('should sort åäö asc', function() {
      list.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖabcdefghijklmnopqrstuvxyzåäö';
      i1.values({ val: "a" });
      i2.values({ val: "å" });
      i3.values({ val: "ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "o" });
      i6.values({ val: "s" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("a");
      expect(list.items[1].values().val).toBe("o");
      expect(list.items[2].values().val).toBe("s");
      expect(list.items[3].values().val).toBe("å");
      expect(list.items[4].values().val).toBe("ä");
      expect(list.items[5].values().val).toBe("ö");
    });
    it('should sort åäö desc case insensitive', function() {
      list.alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö';
      i1.values({ val: "a" });
      i2.values({ val: "Å" });
      i3.values({ val: "ä" });
      i4.values({ val: "Ö" });
      i5.values({ val: "o" });
      i6.values({ val: "S" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).toBe("Ö");
      expect(list.items[1].values().val).toBe("ä");
      expect(list.items[2].values().val).toBe("Å");
      expect(list.items[3].values().val).toBe("S");
      expect(list.items[4].values().val).toBe("o");
      expect(list.items[5].values().val).toBe("a");
    });
    it('should sort åäö asc case insensitive', function() {
      list.alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö';
      i1.values({ val: "A" });
      i2.values({ val: "å" });
      i3.values({ val: "Ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "O" });
      i6.values({ val: "s" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("A");
      expect(list.items[1].values().val).toBe("O");
      expect(list.items[2].values().val).toBe("s");
      expect(list.items[3].values().val).toBe("å");
      expect(list.items[4].values().val).toBe("Ä");
      expect(list.items[5].values().val).toBe("ö");
    });
    it('should handle case-insensitive by default', function() {
      i1.values({ val: "e" });
      i2.values({ val: "b" });
      i4.values({ val: "F" });
      i3.values({ val: "D" });
      i5.values({ val: "A" });
      i6.values({ val: "C" });
      list.sort('val');
      expect(list.items[0].values().val).toBe("A");
      expect(list.items[1].values().val).toBe("b");
      expect(list.items[2].values().val).toBe("C");
      expect(list.items[3].values().val).toBe("D");
      expect(list.items[4].values().val).toBe("e");
      expect(list.items[5].values().val).toBe("F");
    });
    it('should disable insensitive', function() {
      i1.values({ val: "e" });
      i2.values({ val: "b" });
      i4.values({ val: "F" });
      i3.values({ val: "D" });
      i5.values({ val: "A" });
      i6.values({ val: "C" });
      list.sort('val', { insensitive: false });
      expect(list.items[0].values().val).toBe("A");
      expect(list.items[1].values().val).toBe("C");
      expect(list.items[2].values().val).toBe("D");
      expect(list.items[3].values().val).toBe("F");
      expect(list.items[4].values().val).toBe("b");
      expect(list.items[5].values().val).toBe("e");
    });
    it('should sort dates', function() {
      i1.values({ val: "2008-12-10" });
      i2.values({ val: "2008-11-10" });
      i3.values({ val: "2007-11-10" });
      i4.values({ val: "2009-12-10" });
      i5.values({ val: "2007-01-4" });
      i6.values({ val: "2006-12-10" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("2006-12-10");
      expect(list.items[1].values().val).toBe("2007-01-4");
      expect(list.items[2].values().val).toBe("2007-11-10");
      expect(list.items[3].values().val).toBe("2008-11-10");
      expect(list.items[4].values().val).toBe("2008-12-10");
      expect(list.items[5].values().val).toBe("2009-12-10");
    });
    it('should sort file names (a bit wrong)', function() {
      i1.values({ val: "car.mov" });
      i2.values({ val: "01alpha.sgi" });
      i3.values({ val: "001alpha.sgi" });
      i4.values({ val: "my.string_41299.tif" });
      i5.values({ val: "0003.zip" });
      i6.values({ val: "0002.asp" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("01alpha.sgi");
      expect(list.items[1].values().val).toBe("001alpha.sgi");
      expect(list.items[2].values().val).toBe("0002.asp");
      expect(list.items[3].values().val).toBe("0003.zip");
      expect(list.items[4].values().val).toBe("car.mov");
      expect(list.items[5].values().val).toBe("my.string_41299.tif");
    });
    it('should show order of sorted floates (a bit wrong)', function() {
      i1.values({ val: "10.0401" });
      i2.values({ val: "10.022" });
      i3.values({ val: "10.021999" });
      i4.values({ val: "11.231" });
      i5.values({ val: "0003.123" });
      i6.values({ val: "09.2123" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("0003.123");
      expect(list.items[1].values().val).toBe("09.2123");
      expect(list.items[2].values().val).toBe("10.022");
      expect(list.items[3].values().val).toBe("10.0401");
      expect(list.items[4].values().val).toBe("10.021999");
      expect(list.items[5].values().val).toBe("11.231");
    });
    it('should sort IP addresses', function() {
      i1.values({ val: "192.168.1.1" });
      i2.values({ val: "192.168.0.100" });
      i3.values({ val: "192.168.0.1" });
      i4.values({ val: "192.168.1.3" });
      i5.values({ val: "127.0.0.1" });
      i6.values({ val: "192.168.1.2" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("127.0.0.1");
      expect(list.items[1].values().val).toBe("192.168.0.1");
      expect(list.items[2].values().val).toBe("192.168.0.100");
      expect(list.items[3].values().val).toBe("192.168.1.1");
      expect(list.items[4].values().val).toBe("192.168.1.2");
      expect(list.items[5].values().val).toBe("192.168.1.3");
    });
    it('should not break with weird values', function() {
      i1.values({ val: undefined });
      i2.values({ val: null });
      i3.values({ val: 0 });
      i4.values({ val: function() {} });
      i5.values({ val: { foo: "bar" } });

      expect(function() {
        list.sort('val');
      }).not.toThrow();
    });
    it('should handle values from issue 387', function() {
        i1.values({ val: 'Test' });
        i2.values({ val: 'Test1Test2' });
        i3.values({ val: 'Bill-To Phone1 Extension' });
        i4.values({ val: "z" });
        i5.values({ val: "s" });
        i6.values({ val: "y" });
        list.sort('val', { order: 'asc' });
        expect(list.items[0].values().val).toBe('Bill-To Phone1 Extension');
        expect(list.items[1].values().val).toBe('s');
        expect(list.items[2].values().val).toBe('Test');
        expect(list.items[3].values().val).toBe('Test1Test2');
        expect(list.items[4].values().val).toBe('y');
        expect(list.items[5].values().val).toBe('z');
    });

    xit('should show how random values are sorted', function() {
      list.add({ id: '7', val: "" });
      list.add({ id: '8', val: "" });
      list.add({ id: '9', val: "" });
      list.add({ id: '10', val: "" });
      list.add({ id: '11', val: "" });
      list.add({ id: '12', val: "" });

      var i7 = list.get('id', '7')[0],
        i8 = list.get('id', '8')[0],
        i9 = list.get('id', '9')[0],
        i10 = list.get('id', '10')[0],
        i11 = list.get('id', '11')[0],
        i12 = list.get('id', '12')[0];

      i1.values({ val: undefined });
      i2.values({ val: "" });
      i3.values({ val: null });
      i4.values({ val: "a" });
      i5.values({ val: "0" });
      i6.values({ val: true });
      i7.values({ val: 0 });
      i8.values({ val: "z" });
      i9.values({ val: "!" });
      i10.values({ val: "?" });
      i11.values({ val: 100 });
      i12.values({ val: false });

      list.sort('val', { order: "asc" });
      list.sort('val', { order: "desc" });
      list.sort('val', { order: "asc" });

      expect(list.items[0].values().val).toBe("");
      expect(list.items[1].values().val).toBe("!");
      expect(list.items[2].values().val).toBe(0);
      expect(list.items[3].values().val).toBe("0");
      expect(list.items[4].values().val).toBe(100);
      expect(list.items[5].values().val).toBe("?");
      expect(list.items[6].values().val).toBe("a");
      expect(list.items[7].values().val).toBe(false);
      expect(list.items[8].values().val).toBe(null);
      expect(list.items[9].values().val).toBe(true);
      expect(list.items[10].values().val).toBe(undefined);
      expect(list.items[11].values().val).toBe("z");
    });

    it('should handle not longer (since 1.4.0) space and zero the same for desc and asc', function() {
      list.clear();
      list.add({ val: "" });
      list.add({ val: "0" });
      list.add({ val: 0 });

      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("");
      expect(list.items[1].values().val).toBe("0");
      expect(list.items[2].values().val).toBe(0);
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).toBe("0");
      expect(list.items[1].values().val).toBe(0);
      expect(list.items[2].values().val).toBe("");
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).toBe("");
      expect(list.items[1].values().val).toBe("0");
      expect(list.items[2].values().val).toBe(0);
    });

  });

  describe('Custom sort function', function() {
    it('should use custom sort option', function() {
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val', {
        sortFunction: function(itemA, itemB, options) {
          return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
        }
      });
      expect(list.items[0].values().val).toBe("<input value='a' />");
      expect(list.items[1].values().val).toBe("<input value='b' />");
      expect(list.items[2].values().val).toBe("<input value='c' />");
      expect(list.items[3].values().val).toBe("<input value='s' />");
      expect(list.items[4].values().val).toBe("<input value='y' />");
      expect(list.items[5].values().val).toBe("<input value='z' />");
    });
    it('should use default custom sort function', function() {
      list.sortFunction = function(itemA, itemB, options) {
        return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
      };
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val');
      expect(list.items[0].values().val).toBe("<input value='a' />");
      expect(list.items[1].values().val).toBe("<input value='b' />");
      expect(list.items[2].values().val).toBe("<input value='c' />");
      expect(list.items[3].values().val).toBe("<input value='s' />");
      expect(list.items[4].values().val).toBe("<input value='y' />");
      expect(list.items[5].values().val).toBe("<input value='z' />");
    });
    it('should use default custom sort function with order desc', function() {
      list.sortFunction = function(itemA, itemB, options) {
        return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
      };
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val', { order: "desc"});
      expect(list.items[0].values().val).toBe("<input value='z' />");
      expect(list.items[1].values().val).toBe("<input value='y' />");
      expect(list.items[2].values().val).toBe("<input value='s' />");
      expect(list.items[3].values().val).toBe("<input value='c' />");
      expect(list.items[4].values().val).toBe("<input value='b' />");
      expect(list.items[5].values().val).toBe("<input value='a' />");
    });
  });

});
