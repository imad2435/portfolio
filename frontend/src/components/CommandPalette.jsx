import React from 'react';
import { Command } from 'cmdk';

// THE FIX: The component now receives 'open' and 'onOpenChange' as props.
const CommandPalette = ({ open, onOpenChange, info }) => {
  // The useEffect for the keyboard listener has been removed.

  const runAction = (action) => {
    action();
    onOpenChange(false); // Close the palette after an action
  };

  return (
    // The dialog's visibility is now controlled by the 'open' prop from the parent.
    <Command.Dialog open={open} onOpenChange={onOpenChange} label="Global Command Menu">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        
        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => runAction(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }))}>Home</Command.Item>
          <Command.Item onSelect={() => runAction(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}>Projects</Command.Item>
          <Command.Item onSelect={() => runAction(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }))}>Skills</Command.Item>
          <Command.Item onSelect={() => runAction(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))}>Experience</Command.Item>
          <Command.Item onSelect={() => runAction(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))}>Contact</Command.Item>
        </Command.Group>
        
        {info && (
          <Command.Group heading="Actions">
            {info.cv && <Command.Item onSelect={() => runAction(() => window.open(info.cv, '_blank'))}>Download CV</Command.Item>}
            {info.github_url && <Command.Item onSelect={() => runAction(() => window.open(info.github_url, '_blank'))}>Open GitHub</Command.Item>}
            {info.linkedin_url && <Command.Item onSelect={() => runAction(() => window.open(info.linkedin_url, '_blank'))}>Open LinkedIn</Command.Item>}
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandPalette;