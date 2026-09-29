# Save and Restore Tabs

A small Firefox extension for exporting open web tab URLs to a plain-text file and reopening URLs from a text file. It runs locally in Firefox and does not send browsing data anywhere.

## Features

- Export HTTP and HTTPS URLs from the current Firefox window to a UTF-8 `.txt` file, one URL per line.
- Restore HTTP and HTTPS URLs from a text file, opening each valid URL in a background tab.
- Skip browser-internal pages and invalid lines.
- No account, network service, analytics, or external dependencies.

## Requirements

- Firefox 140 or later.
- The `tabs` permission, used only to read tab URLs and create tabs at the user's request.

## Install from source

1. Download or clone this repository.
2. In Firefox, open `about:debugging#/runtime/this-firefox`.
3. Select **Load Temporary Add-on…** and choose this repository's `manifest.json`.

Temporary add-ons are removed when Firefox closes.

## Use

Select the extension button and choose **Save open tab links** to download a dated text file. Choose **Load a file and reopen tabs** to open the restore page, then select a UTF-8 text file with one URL per line. Only `http:` and `https:` URLs are accepted. Restored tabs open in the current window in the background.

## Firefox signing and distribution

Firefox release builds require Mozilla-signed add-ons. To create an unlisted signed build for personal distribution:

1. Create or sign in to an account at the [AMO Developer Hub](https://addons.mozilla.org/developers/).
2. Submit a new add-on and upload a ZIP containing the extension files. Do not include `.git`, documentation-only files, or unrelated development files in the submitted package. The manifest's `browser_specific_settings.gecko.id` is the add-on's permanent ID; keep it unchanged for future updates.
3. Choose **On your own** / self-distribution (unlisted), because this repository's manifest includes a self-hosted `update_url`. Do **not** choose **On this site** for this package: Mozilla-hosted submissions reject `browser_specific_settings.gecko.update_url`.
4. Review the validation results and complete the submission, then download the signed `.xpi` from the Developer Hub. Install it through `about:addons` → gear menu → **Install Add-on From File…**.

### Automatic updates for self-distributed installs

This repository provides an update manifest at [`updates.json`](updates.json), and `manifest.json` points Firefox to its raw GitHub URL. For each release, submit the new version to AMO using the self-distribution channel, download the Mozilla-signed XPI, and attach it to a GitHub Release using the exact filename and versioned URL recorded in `updates.json` (for example, `save-and-restore-tabs-1.0.0.xpi` for `v1.0.0`). Update the version and download link in `updates.json` for every subsequent release. Publish the GitHub release asset before publishing the update manifest change so Firefox never sees a link to a missing package. The repository must remain publicly accessible at the configured GitHub URL for update checks to work.

The update manifest and its download URL are part of the installed add-on's update mechanism. If the repository or release URL changes, update the manifest and keep the existing update-manifest URL available for already-installed copies.

If you want a public listing on AMO instead, use **On this site** and remove the `update_url` property from `browser_specific_settings.gecko` before packaging. Mozilla-hosted add-ons receive updates through AMO and cannot declare their own `update_url`. Choose one distribution channel per submitted package. See Mozilla's [signing and distribution guide](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/) and [submission guide](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/). Upload the source files themselves; AMO signs the add-on package. Do not commit signing credentials, API keys, or signed packages to this repository.

## Privacy

See [PRIVACY.md](PRIVACY.md). In short, the extension reads URLs in the current window only when the user presses the save button, and creates tabs only when the user selects a file to restore. It has no network access or analytics.

## Contributing

Bug reports and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes. Please report security issues privately as described in [SECURITY.md](SECURITY.md).

## License

This project is available under the MIT License. See [LICENSE](LICENSE).
