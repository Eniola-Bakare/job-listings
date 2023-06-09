  // 'use strict'
  import data from './data.json' assert { type: 'json'}

  const searchbar = document.querySelector('.search-bar')
  const searchElWrapper = document.querySelector('.search-els-wrapper')
  const clearBtn = document.querySelector('.clear-btn')
  const jobListWrapper = document.querySelector('.job-list-wrapper')

  let filteredArr = []
  let selectedRoles = []

  // sub filter func
  const filterArrFunc = function(){
    return filteredArr = data.filter(eachRequiredJob => {    
      const eachDataValueArr =[]

      if (selectedRoles.length >= 1) {

        for (const [key, value] of Object.entries(eachRequiredJob)) {
          if (Array.isArray(value)) {
            value.map(eachI => eachDataValueArr.push(eachI.toLowerCase()))
          }else  if (typeof value === 'string'){
            eachDataValueArr.push(value.toLowerCase())            
          }
        }

        let checking = selectedRoles.every(eachSelection => {
          return eachDataValueArr.includes(eachSelection.toLowerCase())
          })
          if (checking) {
            return eachRequiredJob
          }
      } 
    })
  }
  // filter func
  const filterFunc = function(nodeItem, type){
    nodeItem.addEventListener('click', function(){
      searchbar.classList.remove('hidden');   
      if(!selectedRoles.includes(nodeItem.textContent)){
        selectedRoles.push(nodeItem?.textContent)
        
        searchElWrapper.insertAdjacentHTML('afterbegin', `
            <div class="search-el">
              <p class="search-name">${nodeItem?.textContent}</p>
              <button class="close-btn"><img src="./images/icon-remove.svg" alt="close button"/></button>
            </div>
        `)
      }

        let closeBtnNode = [...document.querySelectorAll('.close-btn')]
        closeBtnNode.forEach((eachBtn) => {
          eachBtn.addEventListener('click', function(){
            eachBtn.parentElement.remove()

            // catching the selected items array changes
            let poppedEl = eachBtn.previousElementSibling.textContent
            selectedRoles = selectedRoles.filter(each => each !== poppedEl)

              filterArrFunc()
            
            // here, if the search bar is empty, return the entire data- job listings
            if (!document.querySelector('.search-el')) {
              searchbar.classList.add('hidden')
              selectedRoles = []
              return updateUi(data)
            }

            return updateUi ([...filteredArr])

          })
        })

        // As i delete my console.logs, I'm not deleting this. shows me the journey...
      // console.log( 'node item class list' , nodeItem.classList, type)
      // console.log(selectedRoles, 'selected roles')
      
      // const presentSelectedItems = []
      // const filterText = document.querySelector('.search-name').textContent.toLowerCase();
      // console.log(filterText, 'filter search text')
      // console.log(selectedRoles, 'selected search text')

      // filteredArr = data.filter(eachRequiredJob => {

      //   const typeCheck = Array.isArray(eachRequiredJob[type])
      //   // console.log(typeCheck, 'typecheck')
        
      //   const eachDataValueArr =[]

      //   if (selectedRoles.length >= 1) {

      //     for (const [key, value] of Object.entries(eachRequiredJob)) {
      //       if (Array.isArray(value)) {
      //         value.map(eachI => eachDataValueArr.push(eachI.toLowerCase()))
      //       }else  if (typeof value === 'string'){
      //         eachDataValueArr.push(value.toLowerCase())            
      //       }
      //     }

      //     console.log(eachRequiredJob.company, 'company name')
      //     // console.log(eachDataValueArr, 'company name')
      //     // console.log(eachDataValueArr)

      //     let checking = selectedRoles.every(eachSelection => {
      //       return eachDataValueArr.includes(eachSelection.toLowerCase())
      //        })
      //        if (checking) {
      //         console.log(eachRequiredJob)
      //         presentSelectedItems.push(eachRequiredJob)
      //         return eachRequiredJob
      //        }
      //       //  console.log(checking)
      //       //  console.log(presentSelectedItems)
      //       //  console.log(includes)
      //       //  console.log( includes)
      //       //  console.log(presentSelectedItems, 'length')
      //       //  return presentSelectedItems
      //   } 

      //   // In trying to understand the code, and implement a final func, Irealised if else if blocks below untterly unneccessary. Ah! But I enjoyed the process of thinking through and finding the solution sha.
        
      //   // else if(typeCheck){
      //   //     const eachArr = eachRequiredJob[type].filter( eachItem => {
      //   //       return filterText === eachItem.toLowerCase()
      //   //     })
      //   //     if (eachArr.length >= 1) return eachRequiredJob

      //   //   } else if(!typeCheck) {
      //   //   const eachRole = eachRequiredJob[type].toLowerCase()
      //   //   console.log(eachRole === filterText)
      //   //   return eachRole === filterText
      //   //   // console.log('Not an array')
      //   // }
      //   // console.log(presentSelectedItems)
      //   // console.log(typeof eachRequiredJob[type] === 'object')
      //   // //
      //   // console.log(eachRole)
      //   // return eachRole === filterText
      // })
        filterArrFunc()
        jobListWrapper.innerHTML =''
        return updateUi ([...filteredArr])
    })
  }

  // search bar clear func
  clearBtn.addEventListener('click', function(){
    searchbar.classList.add('hidden')
    selectedRoles = []
    filteredArr = []
    jobListWrapper.innerHTML = searchElWrapper.innerHTML = ''
    updateUi([...data])
  })

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
            <hr class="divider"/>
            <div class="skills-div">
              <p class="role">${eachJob.role}</p>
              <p class="level">${eachJob.level}</p> 
              ${eachJob.languages.map(lang => {
                return`<p class="languages">${lang}</p>`
              }).join("")}
              ${eachJob.tools.map(tool => {
                return `<p class='tools'>${tool}</p>`
              }).join('')}
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

       