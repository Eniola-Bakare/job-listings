// 'use strict'
import data from './data.json' assert { type: 'json'}


// const role = document.querySelectorAll('.role')
const languages = document.querySelectorAll('.languages')
const searchbar = document.querySelector('.search-bar')
const searchElWrapper = document.querySelector('.search-els-wrapper')
const clearBtn = document.querySelector('.clear-btn')
const jobListWrapper = document.querySelector('.job-list-wrapper')
const closeBtn = document.querySelectorAll('.close-btn')

let filteredArr = []
let selectedRoles = []

  // trying to refactor update ui func
  const updateUi = function(dataItem){
    dataItem.forEach(eachJob => {
      jobListWrapper.insertAdjacentHTML('beforeend',  `
    <div class="each-job-item " id=${eachJob.id}>
      <div class="company-roles">
        <img src=${eachJob.logo} alt="logo">
        <div class="roles-div">
          <div class="company-new-featured">
          <p class="comp-name">${eachJob.company}</p>
            ${
              eachJob.new?`<p class="tag-new">NEW!</p>` : ''
            }
            ${
              eachJob.featured?`<p class="tag-featured">FEATURED</p>` : ''
            }
            </div>
          <div class="position">${eachJob.position}</div>
            <div class="time-location"><ul class="contract"><li>${eachJob.postedAt}</li><li>${eachJob.contract}</li><li>${eachJob.location}</li> </ul></div>
            </div>
      </div>
      
      <div class="skills-div">
        <p class="role">${eachJob.role}</p>
        <p class="level">${eachJob.level}</p> 
          ${eachJob.languages.map(lang => {
            return`<p class="languages">${lang}</p>`
          })}
          ${eachJob.tools.map(tool => {
            return `<p class='tools'>${tool}</p>`
          })}
        </div>
        </div>`)
    })

    
  document.querySelectorAll('.role').forEach(eachRole => {
    eachRole.addEventListener('click', function(){
      searchbar.classList.remove('hidden'); 
      selectedRoles.push(eachRole?.textContent)
      // console.log(eachRole.parentElement.parentElement, 'node parent item')
      // console.log(eachRole, 'node item')
      
      // add it to the search bar --- step 1
      searchElWrapper.insertAdjacentHTML('afterbegin', `
          <div class="search-el">
            <p class="search-name">${eachRole?.textContent}</p>
            <button class="close-btn"><img src="./images/icon-remove.svg" alt="close button"/></button>
          </div>
      `)


      console.log( 'eachroles' ,eachRole)
      console.log(selectedRoles, 'selected roles')
      
      // implementing filter
      // filteredArr = data.filter(eachRequiredJob => {
      //   return eachRequiredJob.role?.toLowerCase() === eachRole.textContent.toLowerCase()
      // })

      const filterText = document.querySelector('.search-name').textContent.toLowerCase();
      filteredArr = data.filter(eachRequiredJob => {
        const eachRole = eachRequiredJob.role?.toLowerCase()
        return eachRole === filterText
      })
      console.log(filteredArr)
      jobListWrapper.innerHTML =''
      return updateUi ([...filteredArr])

        // if(selectedRoles.includes(eachRequiredJob.role)){
        //   // console.log(selectedRoles.includes(eachRequiredJob.role))
        //   filteredArr.push(eachRequiredJob)
        //   return jobListWrapper.insertAdjacentHTML('beforeend', updateUi(filteredArr))
        // }
        
    })
  })
   
  }
  updateUi([...data])
  
  


  document.querySelectorAll('.languages').forEach
        clearBtn.addEventListener('click', function(){
          searchbar.classList.add('hidden')
          selectedRoles = []
          filteredArr = []
          jobListWrapper.innerHTML = searchElWrapper.innerHTML = ''
          console.log(filteredArr)
          console.log(searchbar.classList)
          console.log(selectedRoles, 'selected roles')
          console.log(document.querySelectorAll('.role') )
          updateUi([...data])
        })

       