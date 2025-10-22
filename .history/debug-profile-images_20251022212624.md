// Debug Profile Image Persistence Issue

To investigate why profile images (banner and pfp) disappear on page reload:

1. Check browser Network tab when:
   - Loading the profile page
   - Look for any failed API calls to /api/profile

2. Check browser Console for any errors when:
   - Loading profile data
   - Saving profile data

3. Expected API calls on profile page load:
   - GET /api/auth/check (authentication)
   - GET /api/profile (load profile data)
   - GET /api/substances (load user substances)
   - GET /api/ratings (load user ratings) ✅ Working (27 items loaded)

4. Expected behavior:
   - Profile images should be saved as base64 data in the database
   - On page reload, they should be loaded from the database
   - They should not disappear

5. Possible issues:
   - GET /api/profile returning empty data
   - Profile images not being saved to database properly
   - 502 errors preventing profile data loading

Next steps: Check Network tab for API response content