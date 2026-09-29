// const passport = require("passport");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

// module.exports = (Student) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,

//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//         callbackURL:
//           "http://localhost:3000/auth/google/callback",
//       },

//       async (accessToken, refreshToken, profile, cb) => {
//         try {
//           let user = await Student.findOne({
//             googleId: profile.id,
//           });

//           if (!user) {
//             user = await Student.create({
//               googleId: profile.id,

//               username: profile.displayName,

//               email: profile.emails?.[0]?.value,

//               avatar: profile.photos?.[0]?.value,
//             });
//           }

//           return cb(null, user);
//         } catch (error) {
//           console.log(
//             "Passport Google Error:",
//             error
//           );

//           return cb(error, null);
//         }
//       }
//     )
//   );
// };