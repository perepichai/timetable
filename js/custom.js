  window.addEventListener('load', function() {
      var elemTh = document.querySelectorAll('th');
      var buttonAddEvent = $("td > button");
      // var buttonAddEvent = document.querySelectorAll('td');

      var addBtn = document.createElement('button');
      addBtn.classList.add('btn', 'btn-default', 'btn-xs');
      addBtn.setAttribute('type', 'button');
      addBtn.setAttribute('aria-hidden', 'true');
      addBtn.setAttribute('data-toggle', 'modal');
      addBtn.setAttribute('data-target', '#exampleModal');
      addBtn.innerHTML = 'ADD';


      var parent;
// console.log(buttonAddEvent);
//
// buttonAddEvent.forEach(function(item, i, arr) {
// item.appendChild(addBtn);
// });
      for (var y = 0; y < buttonAddEvent.length; y++) {
        // buttonAddEvent[y].appendChild(addBtn);
          buttonAddEvent[y].setAttribute('aria-hidden', 'true');
          buttonAddEvent[y].setAttribute('data-toggle', 'modal');
          buttonAddEvent[y].setAttribute('data-target', '#exampleModal');
          buttonAddEvent[y].addEventListener('click', makeClickHandler());
      }

      addEventStart();
      subscribe();

      function makeClickHandler() {
          "use strict";
          return function() {
              var parent = this.parentNode;
              var methodist = parent.parentNode.classList[0];
              document.querySelector("#typeevent").value = '';
              document.querySelector("#eventid").value = 0;
              document.querySelector("#theme").value = '';
              document.querySelector("#additionaltheme").value = '';
              document.querySelector("#school").value = '';
              document.querySelector("#time").value = '';
              document.querySelector("#place").value = '';
              document.querySelector("#managers").value = '';
              document.querySelector("#comment").value = '';
              document.querySelector('.dateevent').innerHTML = parent.classList[0]; // дата в форму ввода данных
              document.querySelector('.methodist').innerHTML = methodist.toUpperCase();
              console.log(parent.classList[0]);
          };
      }

      function subscribe() {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "/subscribe", true);

          xhr.onreadystatechange = function() {
              if (this.readyState != 4) return;
              if (this.status != 200) {
                  setTimeout(subscribe, 400);
                  return;
              }
              subscribe();
          };
          xhr.send(null);
      }

      addevent.onsubmit = function() {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/sendevent", true);
          var forJSON = {};
          var statusEvent = document.getElementsByName('status');
          var methodist = document.querySelector('.methodist').innerHTML;
          for (var i = 0, length = statusEvent.length; i < length; i++) {
              if (statusEvent[i].checked) {
                  statusEvent = statusEvent[i].value;
                  break;
              }
          }
          forJSON.id = this.elements.eventid.value;
          forJSON.typeEvent = this.elements.typeevent.value;
          forJSON.statusEvent = statusEvent;
          forJSON.date = document.querySelector('.dateevent').innerHTML;
          forJSON.methodist = methodist.toLowerCase();
          forJSON.theme = this.elements.theme.value;
          forJSON.additionaltheme = this.elements.additionaltheme.value;
          forJSON.school = this.elements.school.value;
          forJSON.time = this.elements.time.value;
          forJSON.place = this.elements.place.value;
          forJSON.manager = this.elements.manager.value;
          forJSON.comment = this.elements.comment.value;
          xhr.send(JSON.stringify(forJSON));

          setTimeout(function() {
              location.reload();
          }, 200);

          return false;
      };

      function deleteEvent(parent) {
          console.log(parent);
          var addEvent = document.createElement('button');
          addEvent.classList.add('btn', 'btn-default', 'btn-xs');
          addEvent.setAttribute('type', 'button');
          addEvent.setAttribute('aria-hidden', 'true');
          addEvent.setAttribute('data-toggle', 'modal');
          addEvent.setAttribute('data-target', '#exampleModal');
          addEvent.innerHTML = 'Додати';

          parent.innerHTML = '';
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/deleteevent", true);
          var forJSON = {};
          var eventId = parent.getAttribute('data-id');
          forJSON.id = eventId;
          xhr.send(JSON.stringify(forJSON));

          setTimeout(function() {
              location.reload();
          }, 200);
          return false;
      }

      function addEventStart() {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "/loadevents", true);
          xhr.onreadystatechange = function() {
              if (this.readyState != 4) return;
              if (this.status != 200) {
                  setTimeout(subscribe, 400);
                  return;
              }
              var DataFromJSON = JSON.parse(this.responseText).events;
              DataFromJSON.forEach(function(event, i, DataFromJSON) {
                  //проверка
                  if (event.date === undefined || event.date === "" && event.methodist === undefined || event.methodist === "") {
                      console.log("ошибка в базе, нет даты ивента и методиста!");
                  }
                  var parentStart;
                  var eventStatus;
                  var typeEventForBackground;
                  var date;
                  var methodist;
                  var classForFind;
                  var wrapper = document.createElement('div');
                  var typeEvent = document.createElement('div');
                  var additionaltheme = document.createElement('div');
                  var theme = document.createElement('div');
                  var school = document.createElement('div');
                  var time = document.createElement('div');
                  var place = document.createElement('div');
                  var manager = document.createElement('div');
                  var comment = document.createElement('div');
                  var buttonDelete = document.createElement('button');
                  var buttonUpdate = document.createElement('button');
                  var makeHtml = document.createElement('button');

                  wrapper.setAttribute('data-id', event.id);

                  eventStatus = event.statusEvent;
                  date = event.date;
                  methodist = event.methodist;
                  classForFind = "." + methodist + " > " + "." + date;
                  typeEvent.innerHTML = event.typeEvent;
                  typeEvent.classList.add('typeevent');
                  theme.innerHTML = event.theme;
                  theme.classList.add('theme');
                  additionaltheme.innerHTML = event.additionaltheme;
                  additionaltheme.classList.add('additionaltheme');
                  school.innerHTML = event.school;
                  school.classList.add('school');
                  time.innerHTML = event.time;
                  time.classList.add('time');
                  place.innerHTML = event.place;
                  place.classList.add('place');
                  manager.innerHTML = event.manager;
                  manager.classList.add('manager');
                  comment.innerHTML = event.comment;
                  comment.classList.add('comment');

                  buttonDelete.classList.add('btn', 'btn-xs', 'btn-danger');
                  buttonDelete.id = "delEvent";
                  buttonDelete.innerHTML = "Del";
                  buttonDelete.addEventListener('click', function() {
                      this.parentNode.classList.remove('event-added');
                      parent = this.parentNode;
                      if (confirm("Удалить ивент?")) {
                          deleteEvent(parent);
                      } else {
                          return;
                      }
                  });

                  buttonUpdate.classList.add('btn', 'btn-xs', 'btn-info');
                  buttonUpdate.id = "updateEvent";
                  buttonUpdate.innerHTML = "Upd";
                  buttonUpdate.setAttribute('aria-hidden', 'true');
                  buttonUpdate.setAttribute('data-toggle', 'modal');
                  buttonUpdate.setAttribute('data-target', '#exampleModal');
                  buttonUpdate.addEventListener('click', function() {
                      var parent = this.parentNode;
                      var eventId = parent.getAttribute('data-id');
                      var methodist = parent.parentNode.parentNode.classList[0];
                      document.querySelector("#typeevent").value = parent.childNodes[5].innerHTML;
                      document.querySelector("#theme").value = parent.childNodes[3].innerHTML;
                      document.querySelector("#additionaltheme").value = parent.childNodes[4].innerHTML;
                      document.querySelector("#school").value = parent.childNodes[1].innerHTML;
                      document.querySelector("#time").value = parent.childNodes[2].innerHTML;
                      document.querySelector("#place").value = parent.childNodes[0].innerHTML;
                      document.querySelector("#managers").value = parent.childNodes[6].innerHTML;
                      document.querySelector("#comment").value = parent.childNodes[7].innerHTML;
                      document.querySelector('.dateevent').innerHTML = parent.parentNode.classList[0];
                      document.querySelector('.methodist').innerHTML = methodist.toUpperCase();
                      document.querySelector('#eventid').value = eventId;

                      //статус ивента
                      //так плохо - зависимы от html:
                      if (parent.classList[0] === 'event-info') {
                          document.getElementById('status-1').checked = true;
                      } else if (parent.classList[0] === 'event-accept') {
                          document.getElementById('status-2').checked = true;
                      } else if (parent.classList[0] === 'event-confirm') {
                          document.getElementById('status-3').checked = true;
                      }
                  });
                  makeHtml.innerHTML = "Web";
                  makeHtml.classList.add('btn', 'btn-xs', 'btn-default');
                  makeHtml.id = "make-html";
                  makeHtml.setAttribute('aria-hidden', 'true');
                  makeHtml.setAttribute('data-toggle', 'modal');
                  makeHtml.setAttribute('data-target', '#html');
                  makeHtml.addEventListener('click', function() {
                      parent = this.parentNode;
                      document.querySelector("#make").value = makehtml(
                          parent.childNodes[0].innerHTML, parent.childNodes[1].innerHTML,
                          parent.childNodes[2].innerHTML, parent.childNodes[5].innerHTML,
                          parent.childNodes[3].innerHTML, parent.childNodes[4].innerHTML,
                          parent.parentNode.classList[0], parent.childNodes[6].innerHTML
                      );
                  });
                  parentStart = document.querySelector(classForFind);
                  if (eventStatus === 'пропозиція') {
                      wrapper.classList.add('event-info', 'event-view');
                  } else if (eventStatus === 'прийнято') {
                      wrapper.classList.add('event-accept', 'event-view');
                  } else if (eventStatus === 'підтверджено') {
                      wrapper.classList.add('event-confirm', 'event-view');
                  }
                  //собираем все вместе во wrapper и вставляем в нужную ячейку таблицы
                  wrapper.appendChild(place);
                  wrapper.appendChild(school);
                  wrapper.appendChild(time);
                  wrapper.appendChild(theme);
                  wrapper.appendChild(additionaltheme);
                  wrapper.appendChild(typeEvent);
                  wrapper.appendChild(manager);
                  wrapper.appendChild(comment);
                  wrapper.appendChild(buttonDelete);
                  wrapper.appendChild(buttonUpdate);
                  // кнопка web - html для календаря
                  // wrapper.appendChild(makeHtml);
                  if (parentStart) {
                      parentStart.insertBefore(wrapper, parentStart.children[parentStart.children.length-1]);
                  }
              });
          };
          xhr.send(null);
          document.querySelector('#eventid').value = 0;
      }
  });
