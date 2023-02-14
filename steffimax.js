const allColleagues = document.querySelector('#allColleagues');
const presentColleagues = document.querySelector('#presentColleagues');
const selectButton = document.querySelector('#selectButton');
let selectedColleagues = [];

allColleagues.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
});

presentColleagues.addEventListener('dragover', function(event) {
  event.preventDefault();
});

presentColleagues.addEventListener('drop', function(event) {
  event.preventDefault();
  const colleagueId = event.dataTransfer.getData('text/plain');
  const colleague = document.querySelector(`#${colleagueId}`);
  presentColleagues.appendChild(colleague);
});

selectButton.addEventListener('click', function() {
  const presentColleaguesList = presentColleagues.querySelectorAll('.colleague');
  if (presentColleaguesList.length > 0) {
    let availableColleagues = [];
    for (let i = 0; i < presentColleaguesList.length; i++) {
      if (!presentColleaguesList[i].classList.contains('selected')) {
        availableColleagues.push(presentColleaguesList[i]);
      }
    }
    if (availableColleagues.length > 0) {
      const selectedColleague = availableColleagues[Math.floor(Math.random() * availableColleagues.length)];
      selectedColleagues.push(selectedColleague);
      selectedColleague.classList.add('selected');
      alert(selectedColleague.innerHTML);
    } else {
      for (let i = 0; i < selectedColleagues.length; i++) {
        selectedColleagues[i].classList.remove('selected');
      }
      selectedColleagues = [];
    }
  } else {
    alert('No colleagues are present. Please add colleagues to the present box.');
  }
});