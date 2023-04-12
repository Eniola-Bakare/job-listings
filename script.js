// 'use strict'
import data from './data.json' assert { type: 'json'}


// const role = document.querySelectorAll('.role')
const languages = document.querySelectorAll('.languages')
const searchbar = document.querySelector('.search-bar')
const searchElWrapper = document.querySelector('.search-els-wrapper')
const clearBtn = document.querySelector('.clear-btn')
const jobListWrapper = document.querySelector('.job-list-wrapper')

let filteredArr = []
let selectedRoles = []

// filter func
const filterFunc = function(nodeItem, type){
  nodeItem.addEventListener('click', function(){
    console.log(type, 'parentEl')
    searchbar.classList.remove('hidden'); 
    selectedRoles.push(nodeItem?.textContent)
    console.log(nodeItem?.textContent, 'nodeItemTextCOntent')
    // console.log(eachRole.parentElement.parentElement, 'node parent item')
    // console.log(eachRole, 'node item')
    
    // add it to the search bar --- step 1
    searchElWrapper.insertAdjacentHTML('afterbegin', `
        <div class="search-el">
          <p class="search-name">${nodeItem?.textContent}</p>
          <button class="close-btn"><img src="./images/icon-remove.svg" alt="close button"/></button>
        </div>
    `)

    // for close button n the search elements in the search bar
    let closeBtnNode = [...document.querySelectorAll('.close-btn')]
    closeBtnNode.forEach((eachBtn) => {
      
      eachBtn.addEventListener('click', function(){
        eachBtn.parentElement.remove()
          if (!document.querySelector('.search-el')) {
            searchbar.classList.add('hidden')
            selectedRoles = []
            return updateUi(data)
          }
      })
    console.log(closeBtnNode.length, 'length node<')
    console.log(closeBtnNode.length, 'length after cls btn btn')
    })


    console.log( 'node item class list' , nodeItem.classList, type)
    console.log(selectedRoles, 'selected roles')

    const filterText = document.querySelector('.search-name').textContent.toLowerCase();
    // console.log(filterText, 'filter search text')
    filteredArr = data.filter(eachRequiredJob => {

      const typeCheck = Array.isArray(eachRequiredJob[type])
      console.log(typeCheck, 'typecheck')
      if(typeCheck){
          const eachArr = eachRequiredJob[type].filter( eachItem => {
            return filterText === eachItem.toLowerCase()
          })
          // if(eachArr){ console.log(eachRequiredJob)}
          if (eachArr.length >= 1) return eachRequiredJob

        }
      else if(!typeCheck) {
        const eachRole = eachRequiredJob[type].toLowerCase()
        console.log(eachRole)
        return eachRole === filterText
        // console.log('Not an array')
      }

      // console.log(typeof eachRequiredJob[type] === 'object')
      // //
      // console.log(eachRole)
      // return eachRole === filterText
    })
    console.log(filteredArr)
    console.log(filteredArr)
    jobListWrapper.innerHTML =''
    return updateUi ([...filteredArr])
      
  })
}

// trying to refactor update ui func
const updateUi = function(dataItem){
  jobListWrapper.innerHTML =''
  dataItem.forEach(eachJob => {
    jobListWrapper.insertAdjacentHTML('beforeend',
      `<div class="each-job-item " id=${eachJob.id}>
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
          <div class="divider"></div>
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
        </div>
      `)
  })

  const funcC = function(){
    console.log('position here')
  }
    
  document.querySelectorAll('.role').forEach((eachRole, _, parent) => filterFunc(eachRole, 'role'))
  document.querySelectorAll('.languages').forEach(eachlang => filterFunc(eachlang, 'languages'))
  document.querySelectorAll('.level').forEach(eachPosition => filterFunc(eachPosition, 'level')) 
  
}
updateUi([...data])

// search bar clear func
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

       