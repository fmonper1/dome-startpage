/*
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018 Jaume Fuster i Claris
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// "Thus, programs must be written for people to read, and only incidentally for machines to execute."
// TODO: Commenting.


// ---------- CONFIGURATION ----------

// div.innerHTML : {a.innerHTML : a.href}
var sites = {
			"Reddit": {
				"r/globaloffensive": "https://www.reddit.com/r/GlobalOffensive/",
				"r/PUBG"			: "https://www.reddit.com/r/PUBATTLEGROUNDS/",
				"r/pcmasterrace"	: "https://www.reddit.com/r/pcmasterrace/",
				"r/webdesign"		: "https://www.reddit.com/r/web_design/",
				"r/pcmasterrace"	: "https://www.reddit.com/r/pcmasterrace/",
				"r/soccerstreams"	: "https://www.reddit.com/r/soccerstreams",
				"r/piracy"			: "https://www.reddit.com/r/piracy",
				"r/unity3D"			: "https://www.reddit.com/r/unity3D",
			},
			"Entretenimiento": {
				"YouTube"			: "https://www.youtube.com/",
				"Twitter"			: "https://twitter.com/",
				"Mediavida"			: "https://mediavida.com/",
				"Netflix"			: "https://www.netflix.com",
				"Imgur"				: "https://www.imgur.com"
			},
			"Juegos": { // To find the game ID check the url in the store page or the community page
				"CS:GO"				: "steam://run/730",
				"HLTV"				: "https://www.hltv.org",
				"csgostash"			: "https://www.csgostash.com",
				"BitSkins"			: "https://www.bitskins.com",
				"FaceIt"			: "https://www.faceit.com",
			},
			"Noticias": {
				"El Mundo"			: "https://www.elmundo.es/",
				"AS"				: "https://www.as.com/",
				"Xataka"			: "https://www.xataka.com/",
				"Genbeta"			: "https://www.genbeta.com/",
				"El Chapuzas"		: "http://www.elchapuzasinformatico.com/"
			},
			"Productividad": {				
				"GitHub"			: "https://github.com/fmonper1",				
				"GMail"				: "https://mail.google.com/mail/u/0/",
				"WhatsApp"			: "https://web.whatsapp.com"
			},
			"University": {
				"MUSE Log-in"		: "https://login.shef.ac.uk/cas/login?service=https%3A%2F%2Fwww.sheffield.ac.uk%2Fnap%2Fpanel%2Flogin",
				"Mole"				: "https://vle.shef.ac.uk/webapps/login/",
				"Uni-GMail"			: "https://login.shef.ac.uk/cas/login?service=https%3A%2F%2Fsssso.shef.ac.uk%2Fsimplesaml%2Fmodule.php%2Fcas%2Flinkback.php%3FstateID%3D_ba3049afd61eab51f4791ee934498bc3bc4f9c76c9%253Ahttps%253A%252F%252Fsssso.shef.ac.uk%252Fsimplesaml%252Fsaml2%252Fidp%252FSSOService.php%253Fspentityid%253Dgoogle.com%2526cookieTime%253D1544436860%2526RelayState%253Dhttps%25253A%25252F%25252Faccounts.google.com%25252FCheckCookie%25253Fcontinue%25253Dhttps%2525253A%2525252F%2525252Fmail.google.com%2525252Fmail%2525252Fu%2525252F1%2525252F%252526service%25253Dmail%252526ss%25253D1%252526scc%25253D1%252526rm%25253Dfalse%252526osid%25253D1#",
				"Uni-GDrive"		: "https://login.shef.ac.uk/cas/login?service=https%3A%2F%2Fsssso.shef.ac.uk%2Fsimplesaml%2Fmodule.php%2Fcas%2Flinkback.php%3FstateID%3D_6069890b8912cb907dfb0fa8fc363f7125aa39ad50%253Ahttps%253A%252F%252Fsssso.shef.ac.uk%252Fsimplesaml%252Fsaml2%252Fidp%252FSSOService.php%253Fspentityid%253Dgoogle.com%2526cookieTime%253D1544436859%2526RelayState%253Dhttps%25253A%25252F%25252Faccounts.google.com%25252FCheckCookie%25253Fcontinue%25253Dhttps%2525253A%2525252F%2525252Fdrive.google.com%2525252Fdrive%2525252Fu%2525252F1%2525252Fmy-drive%252526service%25253Dwise"
			}
		};

var search = "https://duckduckgo.com/";		// The search engine
var query  = "q";							// The query variable name for the search engine

var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";

// ---------- BUILD PAGE ----------
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	match = new RegExp(regex ? regex : ".", "i");
	gmatches = false; // kinda ugly, rethink
	for (i = 0; i < Object.keys(sites).length; i++) {
		matches = false;
		sn = Object.keys(sites)[i];
		section = document.createElement("div");
		section.id = sn;
		section.innerHTML = "<span class='section-title'>"+sn+"</span>";
		section.className = "section";
		inner = document.createElement("div");
		for (l = 0; l < Object.keys(sites[sn]).length; l++) {
			ln = Object.keys(sites[sn])[l];
			if (match.test(ln)) {
				link = document.createElement("a");
				link.href = sites[sn][ln];
				link.innerHTML = ln;
				if (!pivotbuffer++ && regex != "") {
					link.className = "selected";
					document.getElementById("action").action = sites[sn][ln];
					document.getElementById("action").children[0].removeAttribute("name");
				}
				inner.appendChild(link);
				matches = true;
				gmatches = true;
				totallinks++;
			}
		}
		section.appendChild(inner);
		matches ? p.appendChild(section) : false;
	}
	if (!gmatches || regex == "") {
		document.getElementById("action").action = search;
		document.getElementById("action").children[0].name = query;
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight+"px";
	console.log(totallinks);
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 38:
			pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
			matchLinks();
			break;
		case 40:
			pivotmatch = pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
			matchLinks();
			break;
		default:
			break;
	}
}

document.getElementById("action").children[0].onkeypress = function(e) {
	if (e.key == "ArrowDown" || e.key == "ArrowUp") {
		return false;
	}
}

function displayClock() {
	now = new Date();
	clock = (now.getHours() < 10 ? "0"+now.getHours() : now.getHours())+":"
			+(now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes())+":"
			+(now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds());
	document.getElementById("clock").innerHTML = clock;
}

function randombg(){
	var bigSize = ["url('bg.jpg')",
	"url('bg2.jpg')",
	"url('bg3.jpg')",
	"url('bg4.png')",
	"url('bmwM1.jpg')"];
	var random= Math.floor(Math.random() * bigSize.length) + 0;
	document.body.style.backgroundImage=bigSize[random];
  }

window.onload = matchLinks();
displayClock();
setInterval(displayClock, 1000);
randombg();
