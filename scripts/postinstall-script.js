var execSync = require('child_process').execSync

if (process.env.NODE_ENV === 'production') {
  console.log('Build server code')
  execSync('yarn build', { stdio: [0, 1, 2] })
}
