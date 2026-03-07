# ✅ Offers Module - Testing Checklist

## 🧪 Complete Testing Guide

Use this checklist to ensure everything is working perfectly!

---

## 📋 Pre-Testing Setup

- [ ] Backend API is running
- [ ] Frontend dev server is running (`npm run dev`)
- [ ] Browser console is open (F12)
- [ ] Network tab is visible (to check API calls)
- [ ] You have admin JWT token

---

## 🎯 Page 1: Offers Listing (/offers)

### Initial Load
- [ ] Page loads without errors
- [ ] Header shows "Offers Management"
- [ ] "Create Offer" button is visible
- [ ] Filters section is visible
- [ ] Offers cards are displayed (if data exists)
- [ ] Pagination is visible (if multiple pages)

### Search Functionality
- [ ] Search input is working
- [ ] Typing filters offers in real-time
- [ ] Search by title works
- [ ] Clear search shows all offers

### Filters
- [ ] Status filter dropdown works
- [ ] Selecting "Active" shows only active offers
- [ ] Selecting "Draft" shows only draft offers
- [ ] Selecting "Expired" shows only expired offers
- [ ] Selecting "Paused" shows only paused offers
- [ ] Category filter works (Service/Product/Bundle)
- [ ] Sort by dropdown works
- [ ] Sort order (asc/desc) works

### Offer Cards
- [ ] Cards display correctly
- [ ] Title is visible
- [ ] Status badge shows correct color
- [ ] Category badge is visible
- [ ] Published badge shows (if published)
- [ ] Price displays correctly (original & discounted)
- [ ] Analytics show (views, redemptions, shares)
- [ ] Redemption progress shows (25/100)
- [ ] Valid dates display correctly
- [ ] Hover effect works (shadow increases)

### Actions
- [ ] Checkbox selection works
- [ ] Multiple checkboxes can be selected
- [ ] Bulk actions bar appears when items selected
- [ ] "Activate" bulk action works
- [ ] "Pause" bulk action works
- [ ] "Deactivate" bulk action works
- [ ] "View" button navigates to details page
- [ ] "Edit" button navigates to edit page
- [ ] "Delete" button shows confirmation
- [ ] Delete confirmation works
- [ ] Offer is deleted after confirmation

### Pagination
- [ ] "Previous" button is disabled on page 1
- [ ] "Next" button works
- [ ] Page number displays correctly
- [ ] Total pages display correctly
- [ ] "Previous" button works on page 2+
- [ ] "Next" button is disabled on last page

### Loading States
- [ ] Loading spinner shows while fetching
- [ ] Cards appear after loading

### Error States
- [ ] Error message shows if API fails
- [ ] Error icon displays

---

## 🎯 Page 2: Create Offer (/offers/create)

### Initial Load
- [ ] Page loads without errors
- [ ] Header shows "Create New Offer"
- [ ] Back button is visible
- [ ] All form sections are visible
- [ ] Form is empty (create mode)

### Basic Information Section
- [ ] Title input works
- [ ] Description textarea works
- [ ] Category dropdown works
- [ ] Type dropdown works
- [ ] Priority input works
- [ ] Required field validation works

### Pricing Section
- [ ] Original price input works
- [ ] Discounted price input works
- [ ] Currency dropdown works
- [ ] Discount percentage auto-calculates
- [ ] Discount percentage displays correctly
- [ ] Green box shows discount info

### Validity Period Section
- [ ] Valid from datetime picker works
- [ ] Valid till datetime picker works
- [ ] Max redemptions input works
- [ ] Number validation works

### Images Section
- [ ] Image URL input works
- [ ] "Add Image URL" button works
- [ ] New image field appears
- [ ] "Remove" button works
- [ ] Image field is removed

### Target Audience Section
- [ ] Customer type dropdown works
- [ ] Location input works
- [ ] "Add" button adds location
- [ ] Location tag appears
- [ ] "×" button removes location
- [ ] Multiple locations can be added
- [ ] Enter key adds location

### Tags Section
- [ ] Tag input works
- [ ] "Add" button adds tag
- [ ] Tag appears
- [ ] "×" button removes tag
- [ ] Multiple tags can be added
- [ ] Enter key adds tag

### Terms & Conditions Section
- [ ] Textarea works
- [ ] Text can be entered

### Form Submission
- [ ] "Create Offer" button is enabled
- [ ] Clicking button submits form
- [ ] Loading state shows (spinner)
- [ ] Success message appears
- [ ] Redirects to offers list
- [ ] New offer appears in list

### Edit Mode
- [ ] Navigate to edit (/offers/create?edit=:id)
- [ ] Header shows "Edit Offer"
- [ ] Form is pre-filled with offer data
- [ ] All fields show correct values
- [ ] Images array is populated
- [ ] Locations are shown as tags
- [ ] Tags are shown
- [ ] "Update Offer" button shows
- [ ] Updating works
- [ ] Success message appears
- [ ] Redirects to offers list

### Validation
- [ ] Required fields show error if empty
- [ ] Form cannot be submitted if invalid
- [ ] Error messages are clear

---

## 🎯 Page 3: Offer Details (/offers/[id])

### Initial Load
- [ ] Page loads without errors
- [ ] Back button is visible
- [ ] Offer title displays
- [ ] Status badge shows
- [ ] Category badge shows
- [ ] Published badge shows (if published)
- [ ] Price displays correctly

### Quick Actions
- [ ] "Activate & Publish" button works
- [ ] Status changes to ACTIVE
- [ ] isPublished becomes true
- [ ] "Pause" button works
- [ ] Status changes to PAUSED
- [ ] "Move to Draft" button works
- [ ] Status changes to DRAFT
- [ ] "Edit Offer" button navigates to edit page

### Analytics Cards
- [ ] Views card displays
- [ ] Redemptions card displays
- [ ] Shares card displays
- [ ] Conversion rate card displays
- [ ] Numbers are correct
- [ ] Icons are visible
- [ ] Gradient backgrounds work

### Tabs
- [ ] Three tabs are visible (Overview, Redemptions, Activity)
- [ ] "Overview" tab is active by default
- [ ] Clicking "Redemptions" tab switches view
- [ ] Clicking "Activity" tab switches view
- [ ] Active tab has purple background
- [ ] Inactive tabs have gray background

### Overview Tab
- [ ] Description displays
- [ ] Valid from date displays
- [ ] Valid till date displays
- [ ] Max redemptions displays
- [ ] Current redemptions displays
- [ ] Remaining redemptions displays
- [ ] Priority displays
- [ ] Target audience displays
- [ ] Customer type displays
- [ ] Locations display as tags
- [ ] Tags display
- [ ] Terms & conditions display

### Redemptions Tab
- [ ] Redemptions list displays
- [ ] Total count shows in header
- [ ] Each redemption card shows:
  - [ ] Redemption code
  - [ ] Status badge
  - [ ] Customer name
  - [ ] Customer phone
  - [ ] Redeemed timestamp
  - [ ] Used timestamp (if used)
- [ ] Empty state shows if no redemptions
- [ ] Pagination works (if multiple pages)

### Activity Tab
- [ ] Activity list displays
- [ ] Each activity shows:
  - [ ] Customer name
  - [ ] Customer phone
  - [ ] Action type
  - [ ] Redemption code (if applicable)
  - [ ] Timestamp
- [ ] Empty state shows if no activity
- [ ] Border-left indicator is visible

### Loading States
- [ ] Loading spinner shows while fetching
- [ ] Content appears after loading

### Error States
- [ ] Error message shows if API fails
- [ ] Error icon displays

---

## 🎯 Page 4: Redemptions (/offers/redemptions)

### Initial Load
- [ ] Page loads without errors
- [ ] Header shows "Redemptions Management"
- [ ] Verification section is visible
- [ ] Filters section is visible
- [ ] Redemptions list is visible (if data exists)

### Verification Section
- [ ] Code input is visible
- [ ] Input accepts text
- [ ] Input converts to uppercase
- [ ] Placeholder text is visible
- [ ] "Verify" button is visible
- [ ] Button is enabled

### Verify Valid Code
- [ ] Enter valid code (e.g., OFF123456)
- [ ] Click "Verify" button
- [ ] Loading spinner shows
- [ ] Success result displays (green box)
- [ ] Check icon shows
- [ ] "Valid Redemption Code" message shows
- [ ] Customer name displays
- [ ] Customer phone displays
- [ ] Customer email displays (if available)
- [ ] Offer title displays
- [ ] Discount price displays
- [ ] Status badge shows
- [ ] Redeemed timestamp displays
- [ ] "Mark as Used" button shows (if ACTIVE)

### Mark as Used
- [ ] Click "Mark as Used" button
- [ ] Confirmation or direct action
- [ ] Success message appears
- [ ] Status changes to USED
- [ ] Verification result clears
- [ ] Input clears

### Verify Invalid Code
- [ ] Enter invalid code
- [ ] Click "Verify" button
- [ ] Error result displays (red box)
- [ ] Error icon shows
- [ ] "Invalid Code" message shows
- [ ] Error message is clear

### Filters
- [ ] Search input works
- [ ] Typing filters redemptions
- [ ] Status filter dropdown works
- [ ] Selecting "Active" shows only active
- [ ] Selecting "Used" shows only used
- [ ] Selecting "Expired" shows only expired
- [ ] "Clear Filters" button works
- [ ] Filters reset

### Redemptions List
- [ ] Cards display correctly
- [ ] Redemption code shows (monospace font)
- [ ] Status badge shows correct color
- [ ] Customer name displays
- [ ] Customer phone displays
- [ ] Customer email displays (if available)
- [ ] Offer title displays
- [ ] Discount price displays
- [ ] Redeemed timestamp displays
- [ ] Used timestamp displays (if used)
- [ ] Hover effect works

### Pagination
- [ ] "Previous" button works
- [ ] "Next" button works
- [ ] Page number displays
- [ ] Total pages display
- [ ] Navigation works correctly

### Loading States
- [ ] Loading spinner shows while fetching
- [ ] Content appears after loading

---

## 🎨 UI/UX Testing

### Design Consistency
- [ ] All pages use same color scheme
- [ ] Headers have gradient backgrounds
- [ ] Buttons have consistent styling
- [ ] Cards have consistent styling
- [ ] Shadows are consistent
- [ ] Border radius is consistent

### Animations
- [ ] Hover effects work on cards
- [ ] Hover effects work on buttons
- [ ] Transitions are smooth
- [ ] Loading spinners animate
- [ ] No janky animations

### Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] All pages are responsive
- [ ] No horizontal scroll
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Forms are usable

### Icons
- [ ] All icons display correctly
- [ ] Icons have correct colors
- [ ] Icons are appropriate size
- [ ] Icons align properly

### Colors
- [ ] Status badges use correct colors
- [ ] Analytics cards use gradients
- [ ] Text is readable
- [ ] Contrast is good

---

## 🔧 Navigation Testing

### Sidebar
- [ ] "Offers" link is visible
- [ ] "Offers" link navigates to /offers
- [ ] "Redemptions" link is visible
- [ ] "Redemptions" link navigates to /offers/redemptions
- [ ] Icons display correctly
- [ ] Active state works

### Bottom Taskbar
- [ ] "Offers" icon is visible
- [ ] "Offers" icon navigates to /offers
- [ ] Active state works
- [ ] Icons display correctly

### Breadcrumbs/Back Buttons
- [ ] Back buttons work
- [ ] Navigation is intuitive
- [ ] No broken links

---

## 🔌 API Testing

### Network Requests
- [ ] Open Network tab in DevTools
- [ ] Check all API calls are successful (200)
- [ ] Check request payloads are correct
- [ ] Check response data is correct
- [ ] Check authorization headers are sent

### Error Handling
- [ ] Disconnect internet
- [ ] Try to load page
- [ ] Error message shows
- [ ] Reconnect internet
- [ ] Retry works

### Loading States
- [ ] Throttle network to "Slow 3G"
- [ ] Loading spinners show
- [ ] Content loads after delay
- [ ] No broken states

---

## 🐛 Bug Testing

### Edge Cases
- [ ] Empty states display correctly
- [ ] Very long titles don't break layout
- [ ] Very long descriptions don't break layout
- [ ] Special characters in input work
- [ ] Large numbers work
- [ ] Negative numbers are prevented
- [ ] Past dates are handled
- [ ] Future dates work

### Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] No console errors
- [ ] All features work

### Performance
- [ ] Pages load quickly
- [ ] No lag when typing
- [ ] Smooth scrolling
- [ ] No memory leaks
- [ ] Images load properly

---

## ✅ Final Checklist

### Functionality
- [ ] All CRUD operations work
- [ ] All filters work
- [ ] All searches work
- [ ] All bulk actions work
- [ ] All validations work
- [ ] All navigations work

### Design
- [ ] All pages look professional
- [ ] All colors are consistent
- [ ] All animations are smooth
- [ ] All icons display
- [ ] All responsive breakpoints work

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] No network errors
- [ ] No broken links
- [ ] No typos

### Documentation
- [ ] README files are clear
- [ ] Code comments are helpful
- [ ] Examples work
- [ ] Instructions are accurate

---

## 🎉 Testing Complete!

If all checkboxes are checked, congratulations! 🎊

Your Offers Management Module is:
- ✅ Fully functional
- ✅ Beautifully designed
- ✅ Production ready
- ✅ Well tested

---

## 📝 Notes Section

Use this space to note any issues found:

```
Issue 1: _______________________________________
Fix: ___________________________________________

Issue 2: _______________________________________
Fix: ___________________________________________

Issue 3: _______________________________________
Fix: ___________________________________________
```

---

**Happy Testing! 🚀**
