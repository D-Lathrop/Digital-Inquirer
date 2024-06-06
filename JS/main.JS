'use strict'

import { app } from './appObject.js'

import { registerAccount } from './exportAggregate.js';

// Hamburger button class toggle.
(function () {
  function toggleMenu () {
    document.getElementById('navOpen').classList.toggle('navClosed')
  }
  const hamburgerBtn = document.getElementById('hamburgerBTN')
  hamburgerBtn.onclick = toggleMenu
})()

// Home Page Preview Function

// Uae a map to store the page previews?  Because it will iterate in order.
function homePreview () {
  const previewArticlesArray = previewArticlesFn()
  function previewArticlesFn () {
    const previewArticles = document.querySelectorAll('.homePreview')
    previewArticles.forEach((article) => {
      const publishDateElement = document.getElementById('publishDate')
      const publishDate = publishDateElement.dataset.date
    })
  }
}

// Toast function
function showToast (toastMessage) {
  const toast = document.getElementById('toast')
  toast.innerText = toastMessage
  toast.classList.add('toastShow')

  // Set a timeout and store its ID
  const timeoutId = setTimeout(function () {
    toast.classList.remove('toastShow')
  }, 8000)

  // Clear the timeout if the toast is dismissed before the timeout duration
  toast.addEventListener('click', function () {
    toast.classList.remove('toastShow')
    clearTimeout(timeoutId) // Clear the timeout
  })
};

// Hover Menu disappear delay
(function () {
  const hoverDelay = document.querySelector('.hoverDelay')
  const dropdownMenuChild = document.querySelector('.dropdownMenuChild')
  let timeoutID = 0

  hoverDelay.addEventListener('mouseenter', function () {
    clearTimeout(timeoutID)
    dropdownMenuChild.classList.add('hoverDelayShow')
  })

  hoverDelay.addEventListener('mouseleave', function () {
    timeoutID = setTimeout(() => {
      dropdownMenuChild.classList.remove('hoverDelayShow')
    }, 200)
  })
})();

// Dark Mode
(function () {
  if (localStorage.getItem('darkMode') === 'true') {
    const darkModeToggleIMG = document.getElementById('darkModeToggleIMG')
    const darkModeChangedElements = document.querySelectorAll('.darkModeChange')
    if (window.location.href.includes('index')) {
      darkModeToggleIMG.src = 'Images/Sun_Icon.png'
      darkModeChangedElements.forEach(element => {
        element.classList.add('darkModeOn')
      })
    } else {
      darkModeToggleIMG.src = '/Images/Sun_Icon.png'
      darkModeChangedElements.forEach(element => {
        element.classList.add('darkModeOn')
      })
    }
  }

  try {
    const darkModeToggleButton = document.getElementById('darkModeToggleButton')
    darkModeToggleButton.addEventListener('click', darkModeImgToggle)
  } catch (error) {
    console.log('There was an issue with initial setup of dark mode event listener and button variables, error message:', error.message)
    const toastMessage = 'There was an issue with initial setup of dark mode event listener and button variables, error message:' + error.message
    showToast(toastMessage)
  }
  function darkModeImgToggle () {
    try {
      const darkModeToggleIMG = document.getElementById('darkModeToggleIMG')
      const darkModeChangedElements = document.querySelectorAll('.darkModeChange')
      const darkModeSrc = darkModeToggleIMG.getAttribute('src')

      switch (darkModeSrc) {
        case 'Images/Moon_Icon.png':
          darkModeToggleIMG.src = 'Images/Sun_Icon.png'
          localStorage.setItem('darkMode', 'true')
          darkModeChangedElements.forEach(element => {
            element.classList.add('darkModeOn')
          })
          break
        case 'Images/Sun_Icon.png':
          darkModeToggleIMG.src = 'Images/Moon_Icon.png'
          localStorage.removeItem('darkMode')
          darkModeChangedElements.forEach(element => {
            element.classList.remove('darkModeOn')
          })
          break
        case '/Images/Moon_Icon.png':
          darkModeToggleIMG.src = '/Images/Sun_Icon.png'
          localStorage.setItem('darkMode', 'true')
          darkModeChangedElements.forEach(element => {
            element.classList.add('darkModeOn')
          })
          break
        default:
          darkModeToggleIMG.src = '/Images/Moon_Icon.png'
          localStorage.removeItem('darkMode')
          darkModeChangedElements.forEach(element => {
            element.classList.remove('darkModeOn')
          })
          break
      }
    } catch (error) {
      console.log('There was an issue with the dark mode, this is the error message:', error.message)
      alert('There was an issue with the dark mode, this is the error message:' + error.message)
    }
  }
})();

// Toggle Menu
(function () {
  const dropDownMenuParent = document.getElementById('loginMenuHover')
  dropDownMenuParent.addEventListener('click', toggleHeaderMenuOn)
  function toggleHeaderMenuOn () {
    const dropDownMenuChild = document.getElementById('loginMenu')
    dropDownMenuChild.classList.toggle('toggleMenuShow')
    const timeoutID = 0

    dropDownMenuChild.addEventListener('mouseleave', function () {
      const dropDownMenuChild = document.getElementById('loginMenu')
      clearTimeout(timeoutID)
      timeoutId = setTimeout(() => {
        dropDownMenuChild.classList.remove('toggleMenuShow')
      }, 2500)
    })
  }
})();

// Embed Map
(function () {
  const centerLongitude = 121.505760
  const centerLatitude = 31.233501
  const zoomLevel = 10

  const view = new ol.View({
    center: ol.proj.fromLonLat([centerLongitude, centerLatitude]),
    zoom: zoomLevel
  })

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view
  })

  // Map Marker
  const markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([centerLongitude, centerLatitude]))
  })

  const markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [markerFeature]
    })
  })
  map.addLayer(markerLayer)
})()

// Register Account function call
if (window.location.href.includes('signUp')) {
  const submitButton = document.getElementById('registerSubmit')
  submitButton.addEventListener('click', registerAccount)
}

// Admin Control Panel Charts
if (window.location.href.includes('admin')) {
  const yearInput = document.getElementById('registeredAccountsYear')
  yearInput.addEventListener('input', registeredAccountsChart)

  let myChart

  function registeredAccountsChart () {
    const ctx = document.getElementById('registeredAccountsChart')
    const selectedYear = yearInput.value
    const registeredAccounts = registeredCounter()
    console.log(registeredAccounts)

    if (myChart) {
      myChart.destroy()
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: `Accounts Registered in ${selectedYear}`,
          data: registeredAccounts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  };

  registeredAccountsChart()

  function registeredCounter () {
    const yearInput = document.getElementById('registeredAccountsYear')
    const selectedYear = yearInput.value
    console.log(typeof selectedYear)
    let janRegisteredCount = 0
    let febRegisteredCount = 0
    let marRegisteredCount = 0
    let aprRegisteredCount = 0
    let mayRegisteredCount = 0
    let junRegisteredCount = 0
    let julRegisteredCount = 0
    let augRegisteredCount = 0
    let sepRegisteredCount = 0
    let octRegisteredCount = 0
    let novRegisteredCount = 0
    let decRegisteredCount = 0

    console.log(app.accounts[0])

    app.accounts.forEach(Account => {
      const yearValue1 = Account.registerDate.charAt(0)
      const yearValue2 = Account.registerDate.charAt(1)
      const yearValue3 = Account.registerDate.charAt(2)
      const yearValue4 = Account.registerDate.charAt(3)
      const registerYear = yearValue1 + yearValue2 + yearValue3 + yearValue4

      const monthValue1 = Account.registerDate.charAt(5)
      const monthValue2 = Account.registerDate.charAt(6)
      const registerMonth = monthValue1 + monthValue2

      if (registerYear === selectedYear) {
        switch (registerMonth) {
          case '01':
            janRegisteredCount += 1
            break
          case '02':
            febRegisteredCount += 1
            break
          case '03':
            marRegisteredCount += 1
            break
          case '04':
            aprRegisteredCount += 1
            break
          case '05':
            mayRegisteredCount += 1
            break
          case '06':
            junRegisteredCount += 1
            break
          case '07':
            julRegisteredCount += 1
            break
          case '08':
            augRegisteredCount += 1
            break
          case '09':
            sepRegisteredCount += 1
            break
          case '10':
            octRegisteredCount += 1
            break
          case '11':
            novRegisteredCount += 1
            break
          case '12':
            decRegisteredCount += 1
            break

          default:
            break
        }
      }
    })

    const monthlyRegistered = [janRegisteredCount, febRegisteredCount, marRegisteredCount, aprRegisteredCount, mayRegisteredCount, junRegisteredCount,
      julRegisteredCount, augRegisteredCount, sepRegisteredCount, octRegisteredCount, novRegisteredCount, decRegisteredCount]
    return monthlyRegistered
  }
}

// Tabs
// function absolutePositionGridFix() {
//     const main = document.querySelector('main');
//     if (main.classList.contains('tabContainer')) {
//         const buttons = document.querySelector('.tabButton');
//         const activeContent = document.querySelector('.activeContent');
//         const height = activeContent.offsetHeight + buttons.offsetHeight;
//         main.style.height = height + 'px';
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     absolutePositionGridFix();
//     window.addEventListener('resize', function() {
//         absolutePositionGridFix();
//     });
// });

(function () {
  const tabButtons = document.querySelectorAll('.tabButton')
  const tabContents = document.querySelectorAll('.tabContent')

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove('activeButton')
      })

      button.classList.add('activeButton')

      tabContents.forEach((content) => {
        content.classList.add('displayNone')
        content.classList.remove('displayBlock')
      })

      tabContents[index].classList.add('displayBlock')
      tabContents[index].classList.remove('displayNone')
    })
  })
})()

// Practice Closure
function createCounter () {
  let count = 0
  return function () {
    count++
    return count
  }
}

const counter = createCounter()

console.log(counter()) // Output: 1
console.log(counter()) // Output: 2
console.log(counter()) // Output: 3

// Practice callback
function callback2 (y) {
  console.log(y)
}

function callback1 (x, cb) {
  const result = x * 2
  return cb(result)
}

callback1(6, callback2)

// Detect lowoercase
function detectWord (str) {
  let result = ''
  const array = Array.from(str)

  array.forEach(function (char) {
    if (char.toLowerCase() === char) {
      result = result + char
    }
  })
  console.log(result)
}

detectWord('DJDJDJDJDJDJstring1')

function detectWord2 (str) {
  let result = ''
  const array = Array.from(str)

  array.forEach((char) => {
    if (char.toLowerCase() === char) {
      result = result + char
    }
  })

  console.log(result)
}

detectWord2('DJDJDJDJDJDJstring2')

// Iterator Practice
// const myString = 'hello'

// function reverseIterator (str) {
//   return {
//     [Symbol.iterator] () {
//       let count = str.length
//       return {
//         next () {
//           count--
//           if (count >= 0) {
//             return {
//               value: str[count],
//               done: false
//             }
//           }
//           return {
//             value: undefined,
//             done: true
//           }
//         }
//       }
//     }
//   }
// }

// const myIterator1 = reverseIterator(myString)

// console.log(myIterator1.next()) // { value: 'o', done: false }
// console.log(myIterator1.next()) // { value: 'l', done: false }
// console.log(myIterator1.next()) // { value: 'l', done: false }
// console.log(myIterator1.next()) // { value: 'e', done: false }
// console.log(myIterator1.next()) // { value: 'h', done: false }
// console.log(myIterator1.next()) // { value: undefined, done: true }

// Account Pseudo Code
/*
    const accountRegistry= [ ]

let accountID = 0000000
while

const accountID =

let account+accountID= {
admin
accountID
accountEmail
accountPassword
accountFirstAndMiddleName
accountLastName
accountPhoto
accountRegisterDate
accountLastActive
accountFollows
accountFriends
accountBlockedAccounts
accountMutedAccounts
}
*/

// (function () {
//         // const testHeader = document.getElementById('testHeader');
//         // const testP = document.getElementById('testP');

//         const text = ['header1', 'header2', 'p1', 'p2'];
//         for (const log of text) {
//             console.log(log)
//         }

//     })();

// function Content(text, subText){
//     this.text = text;
//     this.subText = subText;
// }

// Content.prototype.content = 'content';
// console.log(Content.prototype.content);
//         const testHeader = document.getElementById('testHeader');
//         const testP = document.getElementById('testP');

// const textSet1 = new Content ('Header 1', 'Subtext 1');
// const textSet2 = new Content ('Header 2', 'Subtext 2');
// const textSet3 = new Content ('Header 3', 'Subtext 3');

// console.log(textSet1.content);
// testHeader.textContent = textSet1.text;
// testP.textContent = textSet1.subText;

// console.log (textSet2.text);
// console.log (textSet2.subText);
// console.log (textSet3.text);
// console.log (textSet3.subText);
