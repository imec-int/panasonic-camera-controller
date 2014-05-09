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

## Sniffed data

### Presets

Set preset 4:

    /cgi-bin/aw_ptz?cmd=#M04&res=1

Move to preset 4:

    /cgi-bin/aw_ptz?cmd=#R04&res=1

### Panning

Pan right:

     /cgi-bin/aw_ptz?cmd=#P99&res=1

Pan left:

    /cgi-bin/aw_ptz?cmd=#P01&res=1

Stop panning:

    /cgi-bin/aw_ptz?cmd=#P50&res=1

### Tilting

Tilt up:

    /cgi-bin/aw_ptz?cmd=#T99&res=1

Tilt down:

    /cgi-bin/aw_ptz?cmd=#T01&res=1

Stop tilting:

    /cgi-bin/aw_ptz?cmd=#T50&res=1

### Panning and tilting togheter

Pan/tilt upper left:

    /cgi-bin/aw_ptz?cmd=#PTS0199&res=1

Pan/tilt upper right:

    /cgi-bin/aw_ptz?cmd=#PTS9999&res=1

Pan/tilt lower left:

    /cgi-bin/aw_ptz?cmd=#PTS0101&res=1

Pan/tilt lower right:

    /cgi-bin/aw_ptz?cmd=#PTS9901&res=1

Stop panning and tilting:

    /cgi-bin/aw_ptz?cmd=#PTS5050&res=1

#### Absolute panning and tilting

    /cgi-bin/aw_ptz?cmd=#APC00000000&res=1

first 2 bytes: panning (horizontal, -175 to +175 degrees, [specs](http://www.panasonic.com/business/provideo/AW-HE50S.asp))

last 2 bytes: tilting (vertical, -30 to 90 degrees, [specs](http://www.panasonic.com/business/provideo/AW-HE50S.asp))

    /cgi-bin/aw_ptz?cmd=#APCFFFF0000&res=1

    /cgi-bin/aw_ptz?cmd=#APC0000FFFF&res=1

### Zooming

Zoom in:

    /cgi-bin/aw_ptz?cmd=#Z99&res=1

Zoom out:

    /cgi-bin/aw_ptz?cmd=#Z01&res=1

Stop zooming:

    /cgi-bin/aw_ptz?cmd=#Z50&res=1

Reset zoom:

    /cgi-bin/aw_ptz?cmd=#AXZ555&res=1

### Iris 

Auto Iris off:
    
    /cgi-bin/aw_cam?cmd=ORS:0&res=1

Auto Iris on:

    /cgi-bin/aw_cam?cmd=ORS:1&res=1

### Focus

Auto Focus on:

    /cgi-bin/aw_ptz?cmd=#D10&res=1

Auto Focus off:

    /cgi-bin/aw_ptz?cmd=#D11&res=1

Push Auto Focus:

    /cgi-bin/aw_cam?cmd=OSE:69:1&res=1

### Brightness

Set Manual Brightness:

    /cgi-bin/aw_ptz?cmd=#D30&res=1
    /cgi-bin/aw_cam?cmd=LIS:7&res=1

Set Auto Brightness:

    /cgi-bin/aw_ptz?cmd=#D31&res=1

### Strange things

Set callback route:

    /cgi-bin/event?connect=start&my_port=35201&UID=50

Unknown:

    /cgi-bin/man_session?command=get




