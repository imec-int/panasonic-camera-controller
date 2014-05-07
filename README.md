panasonic-camera-controller
===========================

Node.js library to control Panasonic camera's like the AW-HE50S PT Camera

## Data protocol

There are 2 kinds of commands: __camera commands__ and __P/T commands__. Camera commands can be used to change things related camera settings (auto focus, brightness, ...) whereas P/T commands are used to pan and tilt the camera.

### P/T commands

P/T commands are called using 

    http://[ip]/cgi-bin/aw_ptz?cmd=[PT Command]&res=[Response Type]

__[PT Command]__ are described from page 6 to page 31 in the protocol speficications.

__[Response Type]__ can be __0__ or __1__. Giving you a HTTP response or not.

### Camera commands

    http://[ip]/cgi-bin/aw_cam?cmd=[Camera Command]&res=[Response Type]

__[Camera Command]__ are described from page 32 to page 37 in the protocol speficications.

__[Response Type]__ can be __0__ or __1__. Giving you a HTTP response or not.

## Raw data protocol

Set preset 4:

    /cgi-bin/aw_ptz?cmd=#M04&res=1

Move to preset 4:

    /cgi-bin/aw_ptz?cmd=#R04&res=1

Pan right:

    /cgi-bin/aw_ptz?cmd=#PTS7550&res=1

Pan left:

    /cgi-bin/aw_ptz?cmd=#PTS2550&res=1

Pan up:

    /cgi-bin/aw_ptz?cmd=#PTS5075&res=1

Pan upper left:

    /cgi-bin/aw_ptz?cmd=#PTS2575&res=1

Pan upper right:

    /cgi-bin/aw_ptz?cmd=#PTS7575&res=1

Pan lower left:

    /cgi-bin/aw_ptz?cmd=#PTS2525&res=1

Pan lower right:

    /cgi-bin/aw_ptz?cmd=#PTS7525&res=1

Stop panning:

    /cgi-bin/aw_ptz?cmd=#PTS5050&res=1

One Touch Auto Focus:

    /cgi-bin/aw_cam?cmd=OSE:69:1&res=1

Set Manual Focus:

    /cgi-bin/aw_ptz?cmd=#D10&res=1

Set Auto Focus:

    /cgi-bin/aw_ptz?cmd=#D11&res=1

Reset zoom:

    /cgi-bin/aw_ptz?cmd=#AXZ555&res=1

Set Manual Brightness:

    /cgi-bin/aw_ptz?cmd=#D30&res=1
    /cgi-bin/aw_cam?cmd=LIS:7&res=1

Set Auto Brightness:

    /cgi-bin/aw_ptz?cmd=#D31&res=1

Set callback route:

    /cgi-bin/event?connect=start&my_port=35201&UID=50

