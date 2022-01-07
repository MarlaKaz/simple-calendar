let nav = 0;
let clicked = null;
let clicked2 = null;
//localStorage.clear();
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
console.log(events);

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

function openModal1(date) {
  clicked = date;

  const eventForDay = events.filter((e) => e.date === clicked);
  //const eventForDay = events.find((e) => e.date === dayString);

  if (eventForDay) {
    // for (let i = 0; i < eventForDay.length; i++) {
    //   document.getElementById('eventText').innerText = eventForDay[i].title;
    //   deleteEventModal.style.display = 'block';
    //   // if(document.getElementById(i).clicked == true) {
    //   // }
    // }
  newEventModal.style.display = "block"; //εδώ βάζω ένα if άμα κλικάρω το έτοιμο event τότε ανοίγει τα παρακάτω, αλλιώς δημιουργεί καινούργιο
  // document.getElementById('eventText').innerText = eventForDay.title;
  // deleteEventModal.style.display = 'block';
  } else {
    //newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function openModal2(title, index) {
  clicked = title;
  clicked2 = index;

  const eventIndex = events.filter((e) => e.id === clicked2);

  const eventForDay = events.filter((e) => e.title === clicked && e.id === clicked2);
  const eventBtnUpdate = document.getElementById("updateButton");
  const eventUpdated = document.getElementById("saveButton2");
  //const eventForDay = events.find((e) => e.date === dayString);

  if (eventForDay) {
    for (let i = 0; i < eventForDay.length; i++) {
      document.getElementById('eventText').innerText = eventForDay[i].title;
      deleteEventModal.style.display = 'block';
      eventBtnUpdate.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteEventModal.style.display = 'none';
        document.getElementById('eventTitleInput1').value = eventForDay[i].title;
        updateEventModal.style.display = "block";
      })
      eventUpdated.addEventListener("click", (e) => {
        e.stopPropagation();
        updateEvent(eventForDay[i], eventIndex)
      });
      // if(document.getElementById(i).clicked == true) {
      // }
    }
  //newEventModal.style.display = "block"; //εδώ βάζω ένα if άμα κλικάρω το έτοιμο event τότε ανοίγει τα παρακάτω, αλλιώς δημιουργεί καινούργιο

  } else {
    //newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
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

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
  

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      // if (eventForDay) {
      //   events.find((i) => {
      //     const eventDiv = document.createElement("div");
      //     eventDiv.classList.add("event");
      //     eventDiv.innerText = i.title;
      //     daySquare.appendChild(eventDiv);
      //   });
      // }
      if (eventForDay) {
        for (let i = 0; i < events.length; i++) {
          if (events[i].date == dayString) {
            const eventDiv = document.createElement("div");
            eventDiv.id = i;
            eventDiv.classList.add("event");
            eventDiv.innerText = events[i].title;
            const titleString = events[i].title;
            daySquare.appendChild(eventDiv);
            eventDiv.addEventListener("click", (e) => {
              e.stopPropagation();
              openModal2(titleString, i);
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
  newEventModal.style.display = "none";
  updateEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  clicked2 = null;
  load();
}

function updateEventModal1() {
  // eventTitleInput.classList.remove("error");
  newEventModal.style.display = "block";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "block";
  // eventTitleInput.value = "";
  // clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    //console.log(eventTitleInput.value)
    eventTitleInput.classList.remove("error");



    events.push({
      id: (events.length - 1) + 1,
      date: clicked,
      title: eventTitleInput.value,
    });

    var index = events.findIndex(i => i.title === eventTitleInput.value);
    //console.log(index)

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function updateEvent(title2, eventId) {
  //console.log(eventId)
  //console.log(title2.title)

  if (eventTitleInput1.value !== title2.title) {
    //events[title2.id].splice(title2.id, 1, eventTitleInput1)
    title2.title = eventTitleInput1.value
  }
  localStorage.setItem("events", JSON.stringify(events));

  closeModal();
  //var index = events.findIndex(i => i.title === title2);
  //console.log(index)
  // if (eventTitleInput1.value) {
  //   for (let i = 0; i < events.length; i++) {
  //     if (events[i].title == eventTitleInput1.value ) {
  //       console.log(events[i].title)
  //     }
  //   }
  //   //console.log(eventTitleInput1.value)
  //   eventTitleInput1.classList.remove("error");

  //   var index = events.findIndex(i => i.title === eventTitleInput.value);
  //   console.log(index)

  //   events.splice(index, 1, eventTitleInput1.value)
  // }
}

function deleteEvent() {
  events = events.filter((e) => e.title !== clicked);
  console.log(events)
  localStorage.setItem("events", JSON.stringify(events));
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

  //document.getElementById("updateButton").addEventListener("click", updateEvent);
  document.getElementById("saveButton").addEventListener("click", saveEvent);
  //document.getElementById("saveButton2").addEventListener("click", updateEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document.getElementById("cancelButton2").addEventListener("click", closeModal);
  document.getElementById("deleteButton").addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();

