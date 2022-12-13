import bcrypt from 'bcrypt'

console.log(bcrypt)

const hashedToken = async (str,salt) => {
  const hash = await bcrypt.hash(str,salt)
  console.log(hash)
}

hashedToken('sdsd',10)