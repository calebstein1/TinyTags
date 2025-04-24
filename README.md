# TinyTags

TinyTags is a tiny (<100 SLOC), performant content tagging and filtering library written in plain JavaScript without any dependencies.

## Usage

First, include the `tags.js` file anywhere below your last taggable element (or use defer).
Once that's done, interaction is handled through HTML attributes.
For each of your taggable elements that should show/hide, use `data-tag={tags}`.
You can use either buttons or checkboxes to manage toggling.
To use buttons as toggles, simply add `data-tag-clickable={tag}` to your button, and to use checkboxes, add `data-tag-checkable={tag}` to the checkbox.

Each button or checkbox can be used to toggle a single tag, but each taggable element can have an arbitrary number of tags associated, and will toggle if _every_ tag is unset.

When a taggable element is toggled off, the `Tags_Hidden` class is set for it.
This class will need to be addressed with CSS.
Similarly, each button will always have either the `Tags_ToggleActive` or `Tags_ToggleInactive` class, and each checkbox will always have either the `Tags_CheckActive` or `Tags_CheckInactive` class.

See the included HTML file for a basic usage example.
