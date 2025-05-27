
## Install Node Modules
```sh
npm install --legacy-peer-deps # Run using `sudo` if needed
```
## Start `development` Server
```sh
npx expo start --dev-client --clear
```
<br/>

## Installing new packages/libraries
When new packages/libraries cannot run on Expo Go on the simulator, you need to prebuild the app for its respective simulator(s).

```
IF YOU NEED TO INJECT ENVIRONMENT VARIABLES INTO YOUR PREBUILT APP, 
MAKE SURE THAT THE CORRECT .env FILES HAVE BEEN CREATED BEFORE PROCEEDING
```

Make sure to login into your EAS account:

```
eas login
```

## Android Development
### Build APK for Play Store
```sh
NODE_ENV=test sudo eas build --profile production --platform android
```
### Push updates to Google Play Store
```sh
sudo eas update --platform android --auto
```

## iOS Development
### Installation:
- Install Xcode 16 (https://xcodereleases.com)
- Open your terminal and install the following:
- Install rails

```sh
brew install rbenv ruby-build
   
# Add rbenv to your shell configuration ~/.zshrc
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
```
- Install ruby version
```sh
rbenv install 3.2.2
# Set a Global Ruby Version
rbenv global 3.2.2
# Install Rails
gem install rails
```
- Install cocoapods
```sh
brew install cocoapods
```
- Install Fastlane
```sh
brew install fastlane
```
<br/>
<br/>

# Building Locally

## iOS Development


### Error: Distribution certificate with fingerprint XYZ hasn't been imported successfully

Download Distribution certificate from: [https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer]

```
security add-trusted-cert -d -r unspecified -k ~/Library/Keychains/login.keychain-db ~/Downloads/AppleWWDRCAG3.cer
```

### Updating XCode
[https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes]

Download runtime(s) from: https://developer.apple.com/download/all/?q=Simulator%20Runtime

```sh
sudo xcode-select -s /Applications
xcodebuild -runFirstLaunch
xcrun simctl runtime add "~/Downloads/iOS_17.5_Simulator_Runtime.dmg"
```