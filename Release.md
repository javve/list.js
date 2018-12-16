# RELEASE

1. Update version in package.json
2. Update links in README.md
3. `cp package.json docs/_data/pkg.json`
4. Commit "Version x.y.z"
5. Tag with `git tag -a v1.14.0 -m "Version 1.14.0`
6. Push with `git push`
7. Push tags with `git push --tags`
8. `npm publish`
