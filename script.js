// 'use strict'
import data from './data.json' assert { type: 'json'}

const searchbar = document.querySelector('.search-bar')
const searchElWrapper = document.querySelector('.search-els-wrapper')
const clearBtn = document.querySelector('.clear-btn')
const jobListWrapper = document.querySelector('.job-list-wrapper')

let filteredArr = []
let selectedRoles = []
let typeArr = []

// filter func
const filterFunc = function(nodeItem, type){
  nodeItem.addEventListener('click', function(){
    // console.log(type, 'parentEl')
    searchbar.classList.remove('hidden');
    
    console.log(selectedRoles.includes(nodeItem.textContent), 'checking include first')
    
    // the !selectedRoles.includes... checks that the item is not present, while the type checks to see that the type was not selected too
    if(!selectedRoles.includes(nodeItem.textContent)){
      selectedRoles.push(nodeItem?.textContent)
      typeArr.push(type) //lang/role etc i should remove this sha
      
      searchElWrapper.insertAdjacentHTML('afterbegin', `
          <div class="search-el">
            <p class="search-name">${nodeItem?.textContent}</p>
            <button class="close-btn"><img src="./images/icon-remove.svg" alt="close button"/></button>
          </div>
      `)
    }
    // console.log(nodeItem?.textContent, 'nodeItemTextCOntent')
    // console.log(eachRole.parentElement.parentElement, 'node parent item')
    // console.log(eachRole, 'node item')
    
    // add it to the search bar --- step 1

    // for close button n the search elements in the search bar
    let closeBtnNode = [...document.querySelectorAll('.close-btn')]
    closeBtnNode.forEach((eachBtn) => {
      
      eachBtn.addEventListener('click', function(){
        eachBtn.parentElement.remove()
        // catching the selected items array changes
        console.log(selectedRoles.length)
        let poppedEl = eachBtn.previousElementSibling.textContent
        selectedRoles = selectedRoles.filter(each => each !== poppedEl)
        console.log(selectedRoles.length)

        console.log(selectedRoles, 'remaining selcted roles')
          if (!document.querySelector('.search-el')) {
            searchbar.classList.add('hidden')
            selectedRoles = []
            return updateUi(data)
          }

      })
    // console.log(closeBtnNode.length, 'length node<')
    // console.log(closeBtnNode.length, 'length after cls btn btn')
    console.log(selectedRoles, 'selectedRoles', selectedRoles.length)
    console.log(selectedRoles.includes(nodeItem.textContent), 'checking include after')
    })


    // console.log( 'node item class list' , nodeItem.classList, type)
    // console.log(selectedRoles, 'selected roles')
    
    const presentSelectedItems = []
    const filterText = document.querySelector('.search-name').textContent.toLowerCase();
    console.log(filterText, 'filter search text')
    console.log(selectedRoles, 'selected search text')

    filteredArr = data.filter(eachRequiredJob => {

      const typeCheck = Array.isArray(eachRequiredJob[type])
      // console.log(typeCheck, 'typecheck')
      
      const eachDataValueArr =[]

      if (selectedRoles.length > 1) {

        for (const [key, value] of Object.entries(eachRequiredJob)) {
          if (Array.isArray(value)) {
            value.map(eachI => eachDataValueArr.push(eachI.toLowerCase()))
          }else  if (typeof value === 'string'){
            eachDataValueArr.push(value.toLowerCase())            
          }
        }

        console.log(eachRequiredJob.company, 'company name')
        // console.log(eachDataValueArr, 'company name')
        // console.log(eachDataValueArr)

        let checking = selectedRoles.every(eachSelection => {
          return eachDataValueArr.includes(eachSelection.toLowerCase())
           })
           if (checking) {
            console.log(eachRequiredJob)
            presentSelectedItems.push(eachRequiredJob)
            return eachRequiredJob
           }
          //  console.log(checking)
          //  console.log(presentSelectedItems)
          //  console.log(includes)
          //  console.log( includes)
      // console.log(presentSelectedItems, 'length')
        // return presentSelectedItems
      } 
      else if(typeCheck){
          const eachArr = eachRequiredJob[type].filter( eachItem => {
            return filterText === eachItem.toLowerCase()
          })
          // if(eachArr.){ console.log(eachRequiredJob)}
          if (eachArr.length >= 1) return eachRequiredJob

        } else if(!typeCheck) {
        const eachRole = eachRequiredJob[type].toLowerCase()
        console.log(eachRole === filterText)
        return eachRole === filterText
        // console.log('Not an array')
      }
      console.log(presentSelectedItems)
      // console.log(typeof eachRequiredJob[type] === 'object')
      // //
      // console.log(eachRole)
      // return eachRole === filterText
    })


    // console.log(filteredArr)
    // console.log(filteredArr)
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

  document.querySelectorAll('.role').forEach((eachRole, _, parent) => filterFunc(eachRole, 'role'))
  document.querySelectorAll('.languages').forEach(eachlang => filterFunc(eachlang, 'languages'))
  document.querySelectorAll('.level').forEach(eachPosition => filterFunc(eachPosition, 'level')) 
  document.querySelectorAll('.tools').forEach(eachTool => filterFunc(eachTool, 'tools')) 
  
}
updateUi([...data])

// search bar clear func
clearBtn.addEventListener('click', function(){
  searchbar.classList.add('hidden')
  selectedRoles = []
  filteredArr = []
  jobListWrapper.innerHTML = searchElWrapper.innerHTML = ''
  // console.log(filteredArr)
  // console.log(searchbar.classList)
  // console.log(selectedRoles, 'selected roles')
  // console.log(document.querySelectorAll('.role') )
  updateUi([...data])
})

       