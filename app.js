console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
            .command('add','Add a new note',{
                title: titleOptions,
                body: bodyOptions
            })
            .command('list','List all notes')
            .command('Read','Read a note',{
                title: titleOptions
            })
            .command('remove','Remove a note',{
                title : titleOptions
            })
            .help()
            .argv;
var command = argv._[0];
console.log('command:' + command);
console.log('Yargs:' + JSON.stringify(argv));

if(command === 'add'){
  var note =  notes.addNote(argv.title, argv.body);
  if(note) {
      console.log('Note Created');
      notes.logNote(note);
  } else{
      console.log('Note title taken');
  }
} else if (command === 'read'){
   var note =  notes.readNote(argv.title);
   if (note){
        console.log('Note found');
        notes.logNote(note);
   }else{
        console.log('Note not found');
    }
}else if ( command === 'list'){
    var allnotes = notes.getAll();
    console.log(`Printing ${allnotes.length} note(s).`);
    allnotes.forEach((note) => {
        return notes.logNote(note);
    });
}else if(command === 'remove'){
    var noteRemove = notes.removeNote(argv.title);
    var message = noteRemove? 'Note removed':'No note Found';
    console.log(message);
}    else{
    console.log('Command not recognised');
}