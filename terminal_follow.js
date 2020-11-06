(async () => {
    
  const alertVolume = 50 * .01;
  const delayTime = 0;
  
  const resources = await NerdLoader.load([
    "https://ext-assets.streamlabs.com/users/140067/gsap-3-5-1.min.js",
    "https://ext-assets.streamlabs.com/users/140067/EasePack-3-5-1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.1/lottie.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js",
    { name: "alertSound", url: "https://uploads.twitchalerts.com/000/533/735/358/mech-tech-alert-0a.mp3" },
    { name: "lottieData", url: "https://ext-assets.streamlabs.com/users/140067/mech-alert.json" }
  ]);
 
  const alertSound = resources.alertSound.mute(false).volume(alertVolume);
  
  const lottieAnimation = bodymovin.loadAnimation({
    wrapper: document.querySelector("#animationWindow"),
    animType: "svg",
    loop: false,
    prerender: true,
    autoplay: false,
    animationData: resources.lottieData
  });
  
  gsap.registerPlugin(RoughEase);
  
  const tl = gsap.timeline()
    .set("#alertHolder", {autoAlpha: 1})
    .add(() => alertSound.play())
    .add(() => lottieAnimation.play())
    .from("#iconHolder", {duration: .8, scale: 0, opacity: 0, delay: 1.4})
    .to("#topText", {duration: .5, opacity: 1, ease: "rough({strength: 3, points: 30, template: strong.inOut, taper: both, randomize: true})"}, "-=.2")
    .to("#botText", {duration: .5, opacity: 1, delay: 0.6, ease: "rough({strength: 3, points: 30, template: strong.inOut, taper: both, randomize: true})"})
    .from("#alert-user-message", {duration: .6, opacity: 0}, "-=.2")
    .to("#iconHolder", {duration: .1, opacity: 0}, 9.8)
    .to("#alertHolder", {delay: delayTime, duration: 1, opacity: 0, ease: "rough({strength: 3, points: 30, template: strong.inOut, taper: both, randomize: true})"})
  ;
})();
