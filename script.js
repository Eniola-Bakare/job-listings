// 'use strict'
import data from './data.json' assert { type: 'json'}
console.log(data)

const jobListWrapper = document.querySelector('.job-list-wrapper')
console.log(jobListWrapper)
const skillsDiv = document.querySelector('.skills-div')

data.forEach(eachJob => {
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
        console.log(`<p class='tools'>${tool}</p>`)
      return `<p class='tools'>${tool}</p>`
    })}
  </div>
</div>`)
})
