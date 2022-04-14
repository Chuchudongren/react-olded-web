export default function TestReg(str, title) {
  let reg = new RegExp()
  if (typeof str == 'undefined' || str.length === 0) return false
  switch (title) {
    case 'username':
      reg = /^\w{6,12}$/
      break
    case 'password':
      reg = /^[\S]{6,12}$/
      break
    case 'tel':
      reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      break
    case 'idnumber':
      reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      break
    case 'code':
      reg = /^[0-9]{5}$/
      break
    default:
      reg = null
      break
  }
  if (reg.test(str)) return true
  return false
}
