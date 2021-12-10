# extension-virtual-sticky-notes

![reminder preview](preview.gif)

[reminder UI on CodePen](https://codepen.io/bwlw3127/pen/jOLYPvx)
## Situation
Data cleansing is a big part of any data analyst's day. But it's also a chore phase that will never be enjoyed.

Dealing with data from new products requires additional effort because: 

- **The guidance on data cleansing is still in flux:** There are many product metrics to measure our users' activation, engagement, and interactions. We often receive different requests from different parties. We need to find a way to get all members of the data team on the same page for a stable and consistent result.
    
- **Too many items under each point:** Due to the complexity of our data, sometimes people will forget to look into the details and cause an incomplete result. 
 
## The Extension
This extension creates a reminder section in your work window by adding a brand new div.

The reminder has the following features:

- **Data in the tree structure:** The data is displayed in the nested set model. Since we have deep, complicated structures, tree format is easier for the analyst to read them and see the whole picture.
- **Strikethrough feature:** When users complete an item, cross it out. Just like a simple checklist.
- **External link to the guideline page:** If users want to know more about a specific item, they can click the link and go to that page.
- **Close button:** A close button is necessary. Our reminder div is an additional element that sometimes obscures the original design. Use a close button to remove it when the user no longer needs it.
- **Eye-friendly color choice:**  The color choice is borrowed from the classic design notebook. I think this is the most eye-friendly and nostalgic color combination.

## How to install unpacked extensions:
Go to the extension page (chrome://extensions/) > click the developer mode (top right) > click on load unapacked (top left) > upload the entire folder

## To update the unpacked extensions:
Click on the extension's reload button.

![update extension](update.png)
