## Android release signing

The release keystore (`RNBibleKeystore.jks`) lives in the project root but is **not** committed (see `.gitignore`).

Credentials are **not** stored anywhere in this repo. They live in the machine-global Gradle properties file, which Git can never see:

```
~/.gradle/gradle.properties        (macOS/Linux)
C:\Users\<user>\.gradle\gradle.properties   (Windows)
```

That file must contain:

```properties
RNBIBLE_UPLOAD_KEY_ALIAS=RNBibleKeyAlias
RNBIBLE_UPLOAD_STORE_PASSWORD=<real password>
RNBIBLE_UPLOAD_KEY_PASSWORD=<real password>
```

> Prefixed with `RNBIBLE_` on purpose — this file is shared across all local RN projects on this machine, so each app needs its own prefix to avoid collisions.

If setting up on a new machine:
1. Copy `RNBibleKeystore.jks` into the project root (from backup — never regenerate, it must match the upload key already registered with Google Play).
2. Add the four properties above to `~/.gradle/gradle.properties` on that machine.
3. Run `cd android && ./gradlew bundleRelease` to confirm it signs correctly (no "debug mode" warning on upload).