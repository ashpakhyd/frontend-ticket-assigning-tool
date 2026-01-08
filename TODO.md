# TODO: Fix Login/Logout UI Bugs

## Completed Tasks
- [x] Identified bugs: Admin panel/sidebar not showing after login until refresh, and still showing after logout until refresh.
- [x] Root cause: providers.js checked localStorage only on mount, not reacting to state changes.
- [x] Created AppLayout component that uses useSelector to get token from Redux state.
- [x] Updated providers.js to dispatch setCredentials on mount if token in localStorage, and wrap children with AppLayout inside Provider.

## Remaining Tasks
- [ ] Test the fixes: Login and verify sidebar appears immediately, logout and verify sidebar disappears immediately.
- [ ] If issues persist, check if setCredentials needs to include user data or if profile query is needed.

## Notes
- The AppLayout component now handles the UI conditionally based on Redux auth state.
- Initial state is synced by dispatching setCredentials on app start if token exists in localStorage.
