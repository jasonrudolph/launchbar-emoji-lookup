# Shipping checklist

- [ ] Update `Info.plist`
    - [ ] Bump version number in `CFBundleVersion` property
    - [ ] Add version to `LBChangelog` property
- [ ] Commit and push: `git commit -m 'Prepare vX.Y.Z release' emoji-lookup.lbaction/Contents/Info.plist && git push`
- [ ] Package: `zip -r emoji-lookup-vX.Y.Z.zip emoji-lookup.lbaction/`
- [ ] Publish new release at https://github.com/jasonrudolph/launchbar-emoji-lookup/releases/new
    - [ ] Upload zip file
    - [ ] Add release name and release notes
    - [ ] Publish
