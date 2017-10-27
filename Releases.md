# RELEASE

1. Update version in package.json
2. `cp package.json docs/_data/pkg.json`
3. Commit "Version x.y.z"
4. Tag with `git tag -a v1.14.0 -m "Version 1.14.0`
5. Push with `git push`
6. Push tags with `git push --tags`
7. Update links in README.md
8. `npm publish`
