let nav = 0;
let clicked = null;
let clicked2 = null;
//localStorage.clear();
// let events = localStorage.getItem("events")
//   ? JSON.parse(localStorage.getItem("events"))
//   : [];
// console.log(events);

var settings = {
  url: "https://polar-hollows-75158.herokuapp.com/https://api.corvium.com/api/1.0.0/test/events/61c321e2bc4d6569e93735ea/list",
  method: "POST",
  async: false,
  timeout: 0,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
    "Content-Type": "application/json",
  },
  data: JSON.stringify({ limit: 100, sort: "created_at" }),
};
//

var events;

$.ajax(settings).done(function (response) {
  //console.log(response.return.docs) ;
  events = response.return.docs;
  return events
});

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const updateEventModal = document.getElementById("updateEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const eventTitleInput1 = document.getElementById("eventTitleInput1");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function openModal1(event_date) {
  clicked = event_date;

  const eventForDay = events.filter((e) => e.event_date === clicked);

  if (eventForDay) {
    newEventModal.style.display = "block"; 
  } 

  backDrop.style.display = "block";
}

function openModal2(event_name, index) {
  clicked = event_name;
  clicked2 = index;

  const eventIndex = events.filter((e) => e._id === clicked2);

  const eventForDay = events.filter((e) => e.event_name === clicked && e._id === clicked2);
  const eventBtnUpdate = document.getElementById("updateButton");
  const eventDeleted = document.getElementById("deleteButton");
  const eventUpdated = document.getElementById("saveButton2");

  if (eventForDay) {
    for (let i = 0; i < eventForDay.length; i++) {
      document.getElementById("eventText").innerText = eventForDay[i].event_name;
      deleteEventModal.style.display = "block";
      eventDeleted.addEventListener("click", (e) => {
        deleteEvent(eventForDay[i]);
      })
      eventBtnUpdate.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteEventModal.style.display = "none";
        document.getElementById("eventTitleInput1").value =
          eventForDay[i].event_name;
        updateEventModal.style.display = "block";
      });
      eventUpdated.addEventListener("click", (e) => {
        e.stopPropagation();
        updateEvent(eventForDay[i], eventIndex);
      });
     
    }
  } 

  backDrop.style.display = "block";
}

function load() {
  console.log(events);
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const currenMonth = ('0'+(dt.getMonth()+1)).slice(-2)
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    daySquare.setAttribute("id", "day" + i); //here I assign id to each div

    const dayString = `${year}-${currenMonth}-${('0'+((i - paddingDays)+1)).slice(-2)}T00:00:00.000Z`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.event_date === dayString);
      //console.log(eventForDay)

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        for (let i = 0; i < events.length; i++) {
          if (events[i].event_date == dayString) {
            const eventDiv = document.createElement("div");
            eventDiv.id = events[i]._id;
            eventDiv.classList.add("event");
            eventDiv.innerText = events[i].event_name;
            const titleString = events[i].event_name;
            daySquare.appendChild(eventDiv);
            eventDiv.addEventListener("click", (e) => {
              e.stopPropagation();
              console.log(events)
              openModal2(titleString, events[i]._id);
            });
          }
        }
      }
    } else {
      daySquare.classList.add("padding");
    }
    daySquare.addEventListener("click", () => openModal1(dayString));
    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  //eventTitleInput1.classList.remove("error");
  newEventModal.style.display = "none";
  updateEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  //eventTitleInput1.value = "";
  //nav = 0;
  clicked = null;
  clicked2 = null;
  load();
  //initButtons();
}

function saveEvent() {
  if (eventTitleInput.value) {
    //console.log(eventTitleInput.value)
    eventTitleInput.classList.remove("error");

    // events.push({
    //   //id: events.length - 1 + 1,
    //   event_date: clicked,
    //   event_name: eventTitleInput.value,
    // });

    //localStorage.setItem("events", JSON.stringify(events));

   var settings = {
  url: "https://polar-hollows-75158.herokuapp.com/https://api.corvium.com/api/1.0.0/test/events/61c321e2bc4d6569e93735ea/new",
  method: "POST",
  timeout: 0,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    event_name: eventTitleInput.value,
    event_date: clicked,
  }),
};

  var events;

$.ajax(settings).done(function (response) {
    //console.log(response.return.docs) ;
    events = response.return.docs;
    return events
  });
  
  console.log(events);

    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function updateEvent(title2, eventId) {

  if (eventTitleInput1.value !== title2.event_name) {
    eventTitleInput1.classList.remove("error");
    title2.event_name = eventTitleInput1.value;

  //localStorage.setItem("events", JSON.stringify(events));

  var url = `https://polar-hollows-75158.herokuapp.com/https://api.corvium.com/api/1.0.0/test/events/61c321e2bc4d6569e93735ea/${title2._id}`;

  var settings = {
    url: url,
    method: "PUT",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      event_name: eventTitleInput1.value,
      event_date: title2.event_date,
    }),
  };

  var events;
  
  $.ajax(settings).done(function (response) {
      //console.log(response.return.docs) ;
      events = response.return.docs;
      return events
    });
    
    console.log(events);

  closeModal();

  } else {
    eventTitleInput1.classList.add("error");
  }

}

function deleteEvent(title2) {
  //events = events.filter((e) => e.title !== clicked);

  var url = `https://polar-hollows-75158.herokuapp.com/https://api.corvium.com/api/1.0.0/test/events/61c321e2bc4d6569e93735ea/${title2._id}`;

  var settings = {
    url: url,
    method: "DELETE",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8"
    },
  };

  var events;
  
  $.ajax(settings).done(function (response) {
      //console.log(response.return.docs) ;
      events = response.return.docs;
      return events
    });

  console.log(events);
  //localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document.getElementById("cancelButton2").addEventListener("click", closeModal);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();

