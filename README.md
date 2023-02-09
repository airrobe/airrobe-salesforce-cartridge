# AirRobe Salesforce Commerce Cloud Cartridge

## Setting Custom App Preferences

1. In the CommerceCloud dashboard navigate to `Merchant Tools > Site Preferences > Custom Preferences`. There will be a list of custom preference groups (the list will only contain one item, "Storefront Configs", unless you've added other preference groups previously).
2. Click the "New" button.
3. Under "New Attribute Group", fill out the ID field with "AirRobe Configs" and the Name field with "AirRobe Configurations" (these names don't seem to be important, so you could choose another).
4. Three tabs, "General", "Attribute Definitions", and "Attribute Grouping", should be visible at the top of the page. Click "Attribute Definitions".
5. Click "New" (at this writing, it's at the bottom of the table with the existing attributes).
6. Fill out the ID field with "airRobeScriptSrc" and set the Value Type to "String" (this is the default). 
7. Click "Apply". More fields will appear.
8. Set the "Default Value" field to the URL of the AirRobe script source for staging. (You can set values individually for each of your sites, so you can override this default for production.)
9. Click "Apply".
10. Repeat steps 4-10, setting an attribute called "airRobeAppId" to the app ID for the Salesforce shop in the Connector.
11. Go back to the "Attribute Grouping" tab.
12. Find the "AirRobe Configs" grouping you created in step 3 in the table and click "Edit" in that row.
13. Under the heading "Assign Attribute Definition", you will see a required "ID" field. To the right of this field, there is a button with three dots. Click this button.
14. Select the "airRobeScriptSrc" and "airRobeAppId" attributes using the checkboxes in the popup window that appears and click "Select".

### Customizing Settings Per Site

1. Navigate back to `Merchant Tools > Site Preferences > Custom Preferences`.
2. In the table, click on the "AirRobe Configs" preference group. You'll be taken to a page with a table showing the custom attributes you've chosen ("airRobeScriptSrc" and "airRobeAppId").
3. In each row of the table, there is a link to "Edit Across Sites". Clicking this link will take you to a page where you can set the value of that attribute for each of your sites. It will be populated by default with the default value you set in step 8, above.
4. For each site, change the value of the variable to the desired value and click "Save".
