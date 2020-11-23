import * as React from "react"
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"

const navLinks = [
    { title: `Home`, path: `/discover` },
    { title: `Stream`, path: `/stream` },
    { title: `Library`, path: `/library` },
    { title: `upload`, path: `/upload` }
  ]

const Header = () => {
    return (
        <AppBar position="static">
        <Toolbar>
        <List component="nav" aria-labelledby="main navigation">
            {navLinks.map(({ title, path }) => (
                <a href={path} key={title}>
                <ListItem button>
                <ListItemText primary={title} />
                </ListItem>
                    </a>
            ))}
        </List>
        </Toolbar>
        </AppBar>

    );
}

export default Header;