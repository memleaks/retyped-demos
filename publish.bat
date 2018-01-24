RD /S /Q .\dist\babylon.js
MD .\dist\babylon.js
XCOPY .\BabylonJsDemo\BabylonJsDemo\dist\* .\dist\babylon.js /S /I

RD /S /Q .\dist\chart.js
MD .\dist\chart.js
XCOPY .\ChartJsDemo\ChartJsDemo\dist\* .\dist\chart.js /S /I

RD /S /Q .\dist\dragula
MD .\dist\dragula
XCOPY .\DragulaDemo\DragulaDemo\dist\* .\dist\dragula /S /I

RD /S /Q .\dist\knockout
MD .\dist\knockout
XCOPY .\KnockoutDemo\KnockoutDemo\dist\* .\dist\knockout /S /I

RD /S /Q .\dist\phaser
MD .\dist\phaser
XCOPY .\PhaserDemo\PhaserDemo\dist\* .\dist\phaser /S /I

RD /S /Q .\dist\pixi.js
MD .\dist\pixi.js
XCOPY .\PixiJsDemo\PixiJsDemo\dist\* .\dist\pixi.js /S /I

RD /S /Q .\dist\react
MD .\dist\react
XCOPY .\ReactDemo\ReactDemo\dist\* .\dist\react /S /I

RD /S /Q .\dist\svg.js
MD .\dist\svg.js
XCOPY .\SvgJsDemo\SvgJsDemo\dist\* .\dist\svg.js /S /I

RD /S /Q .\dist\sweetalert
MD .\dist\sweetalert
XCOPY .\SweetAlertDemo\SweetAlertDemo\dist\* .\dist\sweetalert /S /I

RD /S /Q .\dist\syncfusion
MD .\dist\syncfusion
XCOPY .\SyncfusionDemo\SyncfusionDemo\dist\* .\dist\syncfusion /S /I

RD /S /Q .\dist\vue
MD .\dist\vue
XCOPY .\VueDemo\VueDemo\dist\* .\dist\vue /S /I

RD /S /Q .\dist\three.js
MD .\dist\three.js
XCOPY .\ThreeJsDemo\ThreeJsDemo\dist\* .\dist\three.js /S /I

PAUSE