
let currentsongs = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(){
let a = await fetch("http://127.0.0.1:5500/songs/")
let response = await a.text();
// console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
let songs  = []
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3"))
{
    songs.push(element.href.split("/songs/")[1])
}    
}
return songs
}



const playMusic = (track,pause = false)=>{
      currentsongs.src = "/songs/" + track
      if(!pause){   
          currentsongs.play()
      play.src = "img/pause.svg"
      }
      document.querySelector(".songinfo").innerHTML = decodeURI(track)
      document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}



async function main()
{
    //Get the list of all the songs
    let songs = await getSongs()
    playMusic(songs[0],true)
    //show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info ">
                                <div> ${song.replaceAll("%20"," ")} </div>
                              
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`

    }
    
    //Attach an eventlistener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    }) 
    })
    //Attach an eventlistener to play,next ,previous
    play.addEventListener("click",()=>
    {
        if(currentsongs.paused)
        {
            currentsongs.play()
             play.src = "img/pause.svg"
        }
        else{
            currentsongs.pause()
             play.src = "img/play.svg"
        }
    })
   //Listen for timeupdate event
   currentsongs.addEventListener("timeupdate", ()=>{
    console.log(currentsongs.currentTime, currentsongs.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsongs.currentTime)}/${secondsToMinutesSeconds(currentsongs.duration)}`
    document.querySelector(".circle").style.left = (currentsongs.currentTime/currentsongs.duration) * 100 + "%";
   })
   //add an eventlistener to seekbar
   


}
     
main()