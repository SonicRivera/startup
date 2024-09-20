# CS 260 Notes

## Accessing Webserver:
`ssh -i ~/Documents/CS260/Security/CS260.pem ubuntu@meltingpot.live`

## Deploying:

### Simon:
`./deployFiles.sh -k ../Security/CS260.pem -h meltingpot.live -s simon`

### Startup:
Please be in the Web folder when using

`../deployFiles.sh -k ../../Security/CS260.pem -h meltingpot.live -s startup`

Also be sure to do the following in order to have the Icons work

ssh in and `cd services/startup/public` followed by `mkdir Pictures`

Then exit ssh and `scp -i ~/Documents/CS260/Security/CS260.pem -r ~/Documents/CS260/startup/Pictures/favicon.png ubuntu@meltingpot.live:~/services/startup/public/Pictures`

## Assignments:

### GitHub:
I set up a github repository for my startup and learned the basics of version manegment through git.
