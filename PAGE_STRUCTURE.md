# 📱 Offers Module - Page Structure & Flow

## 🗺️ Complete Page Map

```
┌─────────────────────────────────────────────────────────────┐
│                     OFFERS MODULE                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  1. OFFERS LISTING PAGE (/offers)                           │
├─────────────────────────────────────────────────────────────┤
│  📊 Header: "Offers Management"                             │
│  🔘 Button: "Create Offer" → /offers/create                 │
│                                                              │
│  🔍 Filters Section:                                         │
│     • Search input                                           │
│     • Status dropdown (All/Active/Draft/Expired/Paused)     │
│     • Category dropdown (All/Service/Product/Bundle)        │
│     • Sort by dropdown                                       │
│     • Sort order dropdown                                    │
│                                                              │
│  ✅ Bulk Actions (when items selected):                     │
│     • Activate | Pause | Deactivate                         │
│                                                              │
│  📋 Offers List (Cards):                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☑️ [Checkbox] 50% Off AC Service                     │  │
│  │ 🏷️ ACTIVE | SERVICE | Published                      │  │
│  │ 💰 PKR 1000 (was PKR 2000)                           │  │
│  │ 👁️ 150 views | 🎁 25 redeemed | 📤 5 shares         │  │
│  │ ✅ 25/100 redemptions                                 │  │
│  │ 📅 Valid: Jan 15 - Feb 15                            │  │
│  │ [View] [Edit] [Delete]                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⬅️ [Previous] Page 1 of 5 [Next] ➡️                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  2. CREATE/EDIT OFFER PAGE (/offers/create)                │
├─────────────────────────────────────────────────────────────┤
│  📊 Header: "Create New Offer" / "Edit Offer"              │
│  ⬅️ Back button                                             │
│                                                              │
│  📝 FORM SECTIONS:                                          │
│                                                              │
│  ℹ️ Basic Information                                       │
│     • Title *                                                │
│     • Description *                                          │
│     • Category * (Service/Product/Bundle)                   │
│     • Type * (Offer/Deal/Discount)                          │
│     • Priority                                               │
│                                                              │
│  💰 Pricing                                                  │
│     • Original Price *                                       │
│     • Discounted Price *                                     │
│     • Currency (PKR/USD/EUR)                                │
│     • [Auto-calculated discount %]                          │
│                                                              │
│  📅 Validity Period                                          │
│     • Valid From * (datetime)                               │
│     • Valid Till * (datetime)                               │
│     • Max Redemptions *                                      │
│                                                              │
│  🖼️ Images                                                   │
│     • Image URL 1 [Remove]                                  │
│     • Image URL 2 [Remove]                                  │
│     • [+ Add Image URL]                                     │
│                                                              │
│  👥 Target Audience                                          │
│     • Customer Type (All/New/Existing/VIP)                  │
│     • Locations: [Input] [Add]                              │
│       [Karachi ×] [Lahore ×] [Islamabad ×]                 │
│                                                              │
│  🏷️ Tags                                                     │
│     • [Input] [Add]                                         │
│       [AC ×] [Service ×] [Discount ×]                      │
│                                                              │
│  📄 Terms & Conditions                                       │
│     • [Textarea]                                            │
│                                                              │
│  [💾 Create Offer / Update Offer] [Cancel]                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  3. OFFER DETAILS PAGE (/offers/[id])                      │
├─────────────────────────────────────────────────────────────┤
│  📊 Header: "50% Off AC Service"                           │
│  ⬅️ Back to Offers                                          │
│  🏷️ ACTIVE | SERVICE | Published                           │
│  💰 PKR 1000 (was PKR 2000)                                │
│                                                              │
│  🎯 Quick Actions:                                          │
│     [✅ Activate & Publish] [⏸️ Pause]                      │
│     [📝 Move to Draft] [✏️ Edit Offer]                      │
│                                                              │
│  📊 ANALYTICS CARDS:                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │
│  │ 👁️   │ │ 🎁   │ │ 📤   │ │ 📈   │                      │
│  │ 150  │ │  25  │ │  5   │ │16.7% │                      │
│  │Views │ │Redeem│ │Share │ │Conv. │                      │
│  └──────┘ └──────┘ └──────┘ └──────┘                      │
│                                                              │
│  📑 TABS: [Overview] [Redemptions] [Activity]              │
│                                                              │
│  ═══════════════════════════════════════════════════════   │
│  OVERVIEW TAB:                                              │
│  • Full offer description                                   │
│  • Validity dates                                           │
│  • Redemption stats                                         │
│  • Target audience                                          │
│  • Tags                                                     │
│  • Terms & conditions                                       │
│                                                              │
│  REDEMPTIONS TAB:                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ OFF123456 | ACTIVE                                    │  │
│  │ Ahmed Ali | 03001234567                               │  │
│  │ Redeemed: Jan 16, 2024 9:30 AM                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ACTIVITY TAB:                                              │
│  • Recent customer actions                                  │
│  • Timestamps                                               │
│  • Action types                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  4. REDEMPTIONS MANAGEMENT (/offers/redemptions)           │
├─────────────────────────────────────────────────────────────┤
│  📊 Header: "Redemptions Management"                       │
│                                                              │
│  🔍 VERIFY REDEMPTION CODE:                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [Enter code: OFF123456___________] [🔍 Verify]       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ✅ VERIFICATION RESULT (if valid):                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✅ Valid Redemption Code                              │  │
│  │                                                        │  │
│  │ Customer: Ahmed Ali                                   │  │
│  │ Phone: 03001234567                                    │  │
│  │ Offer: 50% Off AC Service                            │  │
│  │ Price: PKR 1000                                       │  │
│  │ Status: ACTIVE                                        │  │
│  │ Redeemed: Jan 16, 2024 9:30 AM                       │  │
│  │                                                        │  │
│  │ [✅ Mark as Used]                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  🔍 Filters:                                                │
│     • Search (code/customer)                                │
│     • Status (All/Active/Used/Expired)                     │
│     • [Clear Filters]                                       │
│                                                              │
│  📋 REDEMPTIONS LIST:                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ OFF123456 | ACTIVE                                    │  │
│  │ Ahmed Ali | 03001234567                               │  │
│  │ Offer: 50% Off AC Service                            │  │
│  │ Price: PKR 1000                                       │  │
│  │ Redeemed: Jan 16, 2024 9:30 AM                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⬅️ [Previous] Page 1 of 5 [Next] ➡️                       │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Coding

### Status Colors
- 🟢 **ACTIVE** - Green (#22c55e)
- 🟡 **PAUSED** - Yellow (#eab308)
- 🔴 **EXPIRED** - Red (#ef4444)
- ⚪ **DRAFT** - Gray (#6b7280)

### Page Themes
- **Offers Listing** - Purple to Blue gradient
- **Create/Edit** - Purple to Blue gradient
- **Details** - Purple to Blue gradient
- **Redemptions** - Green to Blue gradient

### Analytics Cards
- **Views** - Blue gradient
- **Redemptions** - Green gradient
- **Shares** - Purple gradient
- **Conversion** - Orange gradient

## 🔄 User Flow

```
START
  │
  ├─→ View All Offers (/offers)
  │     │
  │     ├─→ Create New Offer (/offers/create)
  │     │     └─→ Submit → Back to List
  │     │
  │     ├─→ View Offer Details (/offers/[id])
  │     │     ├─→ Edit Offer (/offers/create?edit=id)
  │     │     ├─→ Change Status
  │     │     └─→ View Redemptions
  │     │
  │     └─→ Delete Offer
  │           └─→ Confirm → Back to List
  │
  └─→ Manage Redemptions (/offers/redemptions)
        ├─→ Verify Code
        │     └─→ Mark as Used
        │
        └─→ View All Redemptions
              └─→ Filter/Search
```

## 📱 Navigation Structure

```
┌─────────────────────────────────────────┐
│           SIDEBAR MENU                   │
├─────────────────────────────────────────┤
│ 🏠 Home                                  │
│ 📊 Dashboard                             │
│ 🎫 Tickets                               │
│ ➕ Create Ticket                         │
│ 👷 Technicians                           │
│ 👥 Customers                             │
│ 🎁 Offers          ← NEW                │
│ 📱 Redemptions     ← NEW                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        BOTTOM TASKBAR (Mobile)          │
├─────────────────────────────────────────┤
│ [🏠] [🎫] [🎁] [👷] [👤]               │
│ Home Tickets Offers Tech Profile        │
└─────────────────────────────────────────┘
```

## 🎯 Key Features Summary

### Page 1: Offers List
✅ Search & Filter
✅ Bulk Actions
✅ Beautiful Cards
✅ Pagination
✅ Quick Actions

### Page 2: Create/Edit
✅ Multi-section Form
✅ Dynamic Fields
✅ Validation
✅ Auto-calculations
✅ Tag Management

### Page 3: Details
✅ Analytics Dashboard
✅ Tabbed Interface
✅ Quick Actions
✅ Status Management
✅ Activity Timeline

### Page 4: Redemptions
✅ Code Verification
✅ Visual Feedback
✅ Mark as Used
✅ Filter & Search
✅ Complete List

## 🎨 Design Highlights

- **Gradient Headers** - Eye-catching purple-blue gradients
- **Shadow Effects** - Depth with subtle shadows
- **Hover Animations** - Smooth transitions
- **Status Badges** - Color-coded indicators
- **Icon Integration** - Visual clarity
- **Responsive Grid** - Mobile-friendly
- **Loading States** - Spinner animations
- **Empty States** - Helpful messages

---

**Total Pages Created: 4**
**Total Components: 10+**
**Total Features: 50+**
**Design System: Tailwind CSS**
**State Management: Redux Toolkit + RTK Query**
