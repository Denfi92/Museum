// slider
const videoPrev = document.querySelector(".video-prev");
const videoNext = document.querySelector(".video-next");

let videoSlider = new Swiper('.video-slider', {
    slidesPerView: 2,
    spaceBetween: 20,

	navigation: {
		nextEl: '.video-next',
		prevEl: '.video-prev',
	},

	pagination: {
		el: '.video-dots',
		clickable: true,
	},

    breakpoints: {
        981: {
            slidesPerView: 3,
            spaceBetween: 42,
        },
    },

	loop: true,

	initialSlide: 0,
});

// custom player


const videoList = [
    {
        src: 'assets/video/video0.mp4',
        poster: 'assets/video/poster0.jpg',
        link: 'zp1BXPX8jcU',
    },
    {
        src: 'assets/video/video1.mp4',
        poster: 'assets/video/poster1.jpg',
        link: 'Vi5D6FKhRmo',
    },
    {
        src: 'assets/video/video2.mp4',
        poster: 'assets/video/poster2.jpg',
        link: 'NOhDysLnTvY',
    },
    {
        src: 'assets/video/video3.mp4',
        poster: 'assets/video/poster3.jpg',
        link: 'aWmJ5DgyWPI',
    },
    {
        src: 'assets/video/video4.mp4',
        poster: 'assets/video/poster4.jpg',
        link: '2OR0OCr6uRE',
    }
];

const videoWorks = !!document.createElement('video').canPlayType;
const video = document.querySelector('.video');
const videoPlayer = document.querySelector('.video-player');
const videoControls = document.querySelector('.video-controls');
const progressBar = document.getElementById('progress-bar');
const playBtn = document.getElementById('play-btn');
const playBtnBig = document.getElementById('play-btn-big');
const playBtnIcon = document.querySelectorAll('.play-btn-icon');
const pauseBtnIcon = document.querySelector('.pause-btn-icon');
const duration = document.getElementById('duration');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeBar = document.getElementById('volume');
const volumeBtn = document.getElementById('volume-btn');
const volumeBtnIcons = volumeBtn.querySelectorAll('use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeOn = document.querySelector('use[href="#volume-on"]');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const fullscreenBtnIcons = fullscreenBtn.querySelectorAll('use');
let videoIndex = 0;
const videoDotsContainer = document.querySelector('.video-dots');
const videoDots = videoDotsContainer.querySelectorAll('.swiper-pagination-bullet');
const speedInfo = document.querySelector('.speed-info');
const speedValue = document.querySelector('.speed-value');
const speedIcon = document.querySelector('.speed-icon');

videoDotsContainer.addEventListener("click", function(event) {
    stopYoutubeVideo();
    let index = Array.from(videoDots).indexOf(event.target);

    if (~index) {
        videoIndex = index;
        loadVideo(videoIndex);
    }

    showPlayBtn();
});

function showPlayBtn() {
    pauseBtnIcon.classList.add('hidden');
    playBtnIcon.forEach((icon) => icon.classList.remove('hidden'));
}

function showPauseBtn() {
    playBtnIcon.forEach((icon) => icon.classList.add('hidden'));
    pauseBtnIcon.classList.remove('hidden');
}

function togglePlay() {
    if (video.paused || video.ended) {   
        showPauseBtn();
        video.play();
    } else {
        showPlayBtn();
        video.pause();
    }
}

function resetProgress() {
    seek.value = 0;
    progressBar.value = 0;
}

function loadVideo() {
    resetProgress()
    video.poster = videoList[videoIndex].poster;
    video.src = videoList[videoIndex].src;
    video.load();
}

function playNextVideo() {
    if (videoIndex === videoList.length - 1) {
        videoIndex = 0;
    } else {
        videoIndex += 1;
    }
    loadVideo();
    showPlayBtn();
    stopYoutubeVideo();
}

function playPreviousVideo() {
    if (videoIndex === 0) {
        videoIndex = videoList.length - 1;
    } else {
        videoIndex -= 1;
    }
    loadVideo();
    showPlayBtn();
    stopYoutubeVideo();
}

function updateVolumeColor() {
    let colorWidth = Math.ceil(volumeBar.offsetWidth * volume.value);
    volumeBar.style.boxShadow = `inset ${colorWidth}px 0px #710707`;
}

function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    updateVolumeColor();
}

function updateProgress() {
    seek.value = Math.ceil(video.currentTime);
    progressBar.value = Math.ceil(video.currentTime);
}

function skipAhead(event) {
  const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}

function updateVolume() {
    if (video.muted) {
        video.muted = false;
    }

    video.volume = volume.value;
}

function updateVolumeBtn() {
    volumeBtnIcons.forEach((icon) => {icon.classList.add('hidden')});

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
    } else {
        volumeOn.classList.remove('hidden');
    }
}

function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volume.setAttribute('data-volume', volume.value);
        volume.value = 0;
    } else {
        volume.value = volume.dataset.volume;
    }
    updateVolumeColor(volume.value);
}

function changeVolumeDown() {
    if (volume.value > 0) {
        volume.value = parseFloat(volume.value) - 0.1;
    } else {
        return;
    }
    updateVolume();
}

function changeVolumeUp() {
    if (volume.value < 1) {
        volume.value = parseFloat(volume.value) + 0.1;
    } else {
        return;
    }
    updateVolume();
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoPlayer.requestFullscreen();
    }
}

function updateFullscreenBtn() {
    fullscreenBtnIcons.forEach((icon) => icon.classList.toggle('hidden'));
}

function showSpeedInfo() {
    speedValue.textContent = video.playbackRate + 'x';
    speedInfo.classList.remove('hidden');
    setTimeout("speedInfo.classList.add('hidden')", 500);
}

function changeSpeedUp() {
    if (video.paused || video.ended) {
        return;
    } else {
        speedIcon.style.backgroundImage = 'url("assets/svg/player-btn-speed-up.svg")';
        if (video.playbackRate <= 1.75) {
            video.playbackRate += 0.25;
            showSpeedInfo();
        } else {
            showSpeedInfo();
            return;
        }
    }
}

function changeSpeedDown() {
    if (video.paused || video.ended) {
        return;
    } else {
        speedIcon.style.backgroundImage = 'url("assets/svg/player-btn-speed-down.svg")';
        if (video.playbackRate > 0.25) {
            video.playbackRate -= 0.25;
            showSpeedInfo();
        } else {
            showSpeedInfo();
            return;
        }
    }
}

let isVisible;
let videoPlayerDivs = videoPlayer.querySelectorAll('div')
let videoPlayerButtons = videoPlayer.querySelectorAll('button');

function isScrolledIntoView() {
    let rect = videoPlayer.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    isVisible = (elemTop < (window.innerHeight - 100)) && (elemBottom >= 100) && (!buyContainerForm.classList.contains('buy-container-form-shown'));
    if (!isVisible) {
        videoPlayerDivs.forEach(el => {
            el.blur();
        });
        videoPlayerButtons.forEach(el => {
            el.blur();
        });
        video.blur();
    }
    return isVisible;
}

function keyboardShortcuts(event) {
    if (!isVisible) {
        return;
    }

    switch (event.code) {
        case 'Space':
            event.preventDefault();
            togglePlay();
            video.blur();
            break;
        case 'KeyM':
            toggleMute();
            break;
        case 'KeyF':
            toggleFullscreen();
            break;
        case 'Comma':
            changeSpeedDown();
            break;
        case 'Period':
            changeSpeedUp();
            break;
    }
}

loadVideo(videoIndex);

window.addEventListener('load', isScrolledIntoView)
window.addEventListener('scroll', isScrolledIntoView)
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeBtn);
video.addEventListener('volumechange', updateVolumeColor);
video.addEventListener('play', showPauseBtn);
video.addEventListener('play', stopYoutubeVideo);
btnUp.addEventListener('click', stopYoutubeVideo);
video.addEventListener('pause', showPlayBtn);
video.addEventListener('volumechange', updateVolumeColor);
playBtnBig.addEventListener('click', togglePlay);
volume.addEventListener('input', updateVolume);
seek.addEventListener('input', skipAhead);
playBtn.addEventListener('click', togglePlay);
volumeBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullscreen);
videoPlayer.addEventListener('fullscreenchange', updateFullscreenBtn);
video.addEventListener('dblclick', toggleFullscreen);
videoPrev.addEventListener('click', playPreviousVideo);
videoNext.addEventListener('click', playNextVideo);
window.addEventListener('keydown', keyboardShortcuts);
window.addEventListener('resize', updateVolumeColor);


/* Youtube API */

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const sliders = document.querySelectorAll('.video-slider .swiper-slide');
sliders.forEach((item, index) => {
    item.setAttribute('id', `slider-${index}`);
    item.addEventListener('click', () => {
        realIndex = item.getAttribute('data-swiper-slide-index');
        let player = item.firstElementChild.firstElementChild;
        item.firstElementChild.lastElementChild.style.display = 'none';
        player = new YT.Player(player, {
            height: '452',
            width: '254',
            videoId: `${videoList[realIndex].link}`,
            playerVars: { 'autoplay': 1, 'controls': 1, 'showinfo': 0, 'rel': 0},
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        })

        setTimeout(function () {
            item.firstElementChild.firstElementChild.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        }, 5000)
    })
})

function onPlayerReady(event) {
    event.target.playVideo();
}

// video stop

let activeVideo;

function onPlayerStateChange(event) {
    let currentVideo = event.target;
    
    if (activeVideo !== currentVideo && (event.data === 1 || event.data === -1)) {
        if (activeVideo) {
            activeVideo.pauseVideo();
            activeVideo = currentVideo;
        } else {
            activeVideo = currentVideo;
        }
    }
    if (event.data === 1) {
        video.pause();
    }
}

function stopYoutubeVideo() {
    if (activeVideo) {
        if (activeVideo.getPlayerState() === 1) {
            activeVideo.pauseVideo();
            activeVideo = undefined;
        }
    }
}