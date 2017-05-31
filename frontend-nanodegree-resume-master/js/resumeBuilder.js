var bio = {
    "name": "Rishabh Sachdeva",
    "role": "Web-Developer/Illustrator",
    "contacts": {
        "mobile": "+91-9910511800",
        "email": "sachdeva.rishabh96@gmail.com",
        "github": "rishabhs1996",
        "instagram": "@isachd",
        "facebook": "www.facebook.com/iSachd19",
        "location": "New Delhi,India"
    },
    "welcomeMessage": "Hi folks! My name is Rishabh Sachdeva and I love playing guitar and making illustrations",
    "skills": ["String Instruments", "Adobe Illustrator", "Adobe Photoshop", "Time Travel"],
    "biopic": "images/IMG_3155.jpg",
};
bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);

    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub= HTMLgithub.replace("%data%",bio.contacts.github);
    var formattedInstagram = HTMLinstagram.replace("%data%", bio.contacts.instagram);
    var formattedFacebook = HTMLfacebook.replace("%data%", bio.contacts.facebook);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    $("#topContacts").append(formattedMobile + formattedEmail + formattedGithub + formattedInstagram + formattedFacebook + formattedLocation);
    $("#footerContacts").append(formattedMobile + formattedEmail + formattedGithub + formattedFacebook + formattedInstagram + formattedLocation);
    var formattedPic = HTMLbioPic.replace("%data%", bio.biopic); +
    $("#header").append(formattedPic);
    var formattedMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(formattedMsg);
    $("#header").append(HTMLskillsStart);

    for (var i = 0; i < bio.skills.length; i++) {
        $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
    }

};
bio.display();
var work = {

    "jobs": [{
            "employer": "Sofarsounds",
            "title": "Intern",
            "location": "New Delhi,India",
            "dates": " March 2017-present",
            "description": "Sofar Sounds (or Songs from a Room) is a global community where music lovers and artists come together to experience music in an intimate setting at a secret concert. I work in a small team to organise up to 5 “Sofar Sounds” concerts per month in New Delhi. My role is to scout and book up to 5 new artists per month, and to source any last minute replacements"
        }, {
            "employer": "iSachd Desings",
            "title": "Freelance Creative / Art Director, Artist",
            "location": "New Delhi,India",
            "dates": " June 2015 - December 2016 ",
            "description": " Worked independently under the name iSachd Design, I handled all aspects and phases of the creative process from concept to completion including working in both a hands-on and managerial capacity."
        }

    ]
};
work.display = function() {
    $("#workExperience").append(HTMLworkStart);

    for (var i = 0; i < work.jobs.length; i++) {
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
        $(".work-entry:last").append(formattedEmployer);
        $(".work-entry:last").append(formattedTitle);
        $(".work-entry:last").append(formattedDates);
        $(".work-entry:last").append(formattedLocation);
        $(".work-entry:last").append(formattedDescription);

    }

};
work.display();
var projects = {

    "projects": [{
        "title": "Vector Minimal Art",
        "dates": "2017",
        "description": "This was a personal project, I created vector minimal art of my favorite musicians using Adobe Illustrator CC 2015 and Adobe Photoshop CC 2015.",

        "images": ["images/ben.jpg", "images/bon.jpg", "images/prateek.jpg"]
    }, {

        "title": "Portfolio",
        "dates": "2017",
        "description": "This is my portfolio, and this project is a part of Udacity's Front-End Nanodegree. The project is a responsive webpage made using bootstrap. ",

        "images": ["images/port.PNG"]

    }]
};
projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    for (var i = 0; i < projects.projects.length; i++) {
        var formattedPtitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
        var formattedPdate = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
        var formattedPdesc = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
        $(".project-entry:last").append(formattedPtitle + formattedPdate + formattedPdesc);
        for (j = 0; j < projects.projects[i].images.length; j++) {
            $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[i].images[j]));
        }

    }
};

projects.display();
var education = {
    "schools": [{
        "name": "Mata Jai Kaur Public School",
        "location": "Ashok Vihar, New Delhi, India",
        "degree": "High School",
        "majors": ["Non Medical"],
        "dates": "2001-2015",
        "url": "http://www.mjkpsdelhi.com/"
    }, {
        "name": "Chitkara University",
        "location": "Chandigarh-Rajpura Highway",
        "degree": "B.E",
        "majors": ["CSE"],
        "dates": "2015-2019",
        "url": "chitkara.edu.in"
    }],

    "onlineCourses": [{
        "title": "Front-End Web Developer Nanodegree | Udacity",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/course/nd001"
    }]
};

education.display = function() {
    $("#education").append(HTMLschoolStart);
    for (var i = 0; i < education.schools.length; i++) {
        var formattedSname = HTMLschoolName.replace("%data%", education.schools[i].name);

        var formattedSlocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
        var formattedSdegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
        var formattedSmajors = HTMLschoolMajor.replace("%data%", education.schools[i].majors);
        var formattedSdates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
        var formattedSsurl = HTMLschoolURL.replace("%data%", education.schools[i].url);
        $(".education-entry:last").append(formattedSname + formattedSlocation + formattedSdegree + formattedSdates + formattedSmajors + formattedSsurl);
    }};
education.display();      
education.onlineCourses.display= function(){
    $("#education").append(HTMLonlineClasses);
    for (var y =0;y < education.onlineCourses.length;y++){

    var formattedOtitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[y].title);
    var formattedOschool = HTMLonlineSchool.replace("%data%", education.onlineCourses[y].school);
    var formattedOdates = HTMLonlineDates.replace("%data%", education.onlineCourses[y].dates);
    var formattedOurl = HTMLonlineURL.replace("%data%", education.onlineCourses[y].url);
    $(".education-entry:last").append(formattedOtitle + formattedOschool + formattedOdates + formattedOurl);}

};
  education.onlineCourses.display();  

$("#mapDiv").append(googleMap);