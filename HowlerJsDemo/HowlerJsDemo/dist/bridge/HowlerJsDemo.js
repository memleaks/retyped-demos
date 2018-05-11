/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("HowlerJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("HowlerJsDemo.App", {
        main: function Main () {
            HowlerJsDemo.App._content = document.querySelector("#content");

            var btnRadio = document.querySelector("#btnRadio");
            var btnSprite = document.querySelector("#btnSprite");

            btnRadio.onclick = function (ev) {
                HowlerJsDemo.App._radio != null ? HowlerJsDemo.App._radio.Stop() : null;
                HowlerJsDemo.App._sprite != null ? HowlerJsDemo.App._sprite.Stop() : null;

                HowlerJsDemo.App.RenderRadio();
                return Bridge.box(true, System.Boolean, System.Boolean.toString);
            };

            btnSprite.onclick = function (ev) {
                HowlerJsDemo.App._radio != null ? HowlerJsDemo.App._radio.Stop() : null;
                HowlerJsDemo.App._sprite != null ? HowlerJsDemo.App._sprite.Stop() : null;

                HowlerJsDemo.App.RenderSprite();
                return Bridge.box(true, System.Boolean, System.Boolean.toString);
            };

            HowlerJsDemo.App.RenderRadio();
        },
        statics: {
            fields: {
                _rootDiv: null,
                _content: null,
                _radio: null,
                _sprite: null
            },
            methods: {
                /**
                 * Original sources: https://github.com/goldfire/howler.js/blob/df3aa43806e5e393312254946e36a4514e3a8f4d/examples/radio/radio.js
                 *
                 * @static
                 * @private
                 * @this HowlerJsDemo.App
                 * @memberof HowlerJsDemo.App
                 * @return  {void}
                 */
                RenderRadio: function () {
                    var $t, $t1;
                    if (HowlerJsDemo.App._rootDiv != null) {
                        HowlerJsDemo.App._content.removeChild(HowlerJsDemo.App._rootDiv);
                    }

                    HowlerJsDemo.App._rootDiv = ($t = document.createElement("div"), $t.className = "radioRoot", $t.style.padding = "100px", $t);

                    HowlerJsDemo.App._content.appendChild(HowlerJsDemo.App._rootDiv);

                    HowlerJsDemo.App._radio = new HowlerJsDemo.RadioDemo.Radio(HowlerJsDemo.App._rootDiv, System.Array.init([($t = new HowlerJsDemo.RadioDemo.RadioStation(), $t.Freq = "81.4", $t.Title = "Groove Salad", $t.Sources = System.Array.init([($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/groovesalad-128-mp3", $t1.Format = "mp3", $t1), ($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/groovesalad-128-aac", $t1.Format = "aac", $t1)], HowlerJsDemo.RadioDemo.RadioStationSrc), $t), ($t = new HowlerJsDemo.RadioDemo.RadioStation(), $t.Freq = "89.9", $t.Title = "Secret Agent", $t.Sources = System.Array.init([($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/secretagent-128-mp3", $t1.Format = "mp3", $t1), ($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/secretagent-128-aac", $t1.Format = "aac", $t1)], HowlerJsDemo.RadioDemo.RadioStationSrc), $t), ($t = new HowlerJsDemo.RadioDemo.RadioStation(), $t.Freq = "98.9", $t.Title = "Indie Pop", $t.Sources = System.Array.init([($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/indiepop-128-mp3", $t1.Format = "mp3", $t1), ($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/indiepop-128-aac", $t1.Format = "aac", $t1)], HowlerJsDemo.RadioDemo.RadioStationSrc), $t), ($t = new HowlerJsDemo.RadioDemo.RadioStation(), $t.Freq = "103.3", $t.Title = "Police Radio", $t.Sources = System.Array.init([($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/sf1033-128-mp3", $t1.Format = "mp3", $t1), ($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice2.somafm.com/sf1033-64-aac", $t1.Format = "aac", $t1)], HowlerJsDemo.RadioDemo.RadioStationSrc), $t), ($t = new HowlerJsDemo.RadioDemo.RadioStation(), $t.Freq = "107.7", $t.Title = "The Trip", $t.Sources = System.Array.init([($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice1.somafm.com/thetrip-128-mp3", $t1.Format = "mp3", $t1), ($t1 = new HowlerJsDemo.RadioDemo.RadioStationSrc(), $t1.Url = "http://ice2.somafm.com/thetrip-64-aac", $t1.Format = "aac", $t1)], HowlerJsDemo.RadioDemo.RadioStationSrc), $t)], HowlerJsDemo.RadioDemo.RadioStation));
                },
                /**
                 * Original sources: https://github.com/goldfire/howler.js/blob/df3aa43806e5e393312254946e36a4514e3a8f4d/examples/sprite/sprite.js
                 *
                 * @static
                 * @private
                 * @this HowlerJsDemo.App
                 * @memberof HowlerJsDemo.App
                 * @return  {void}
                 */
                RenderSprite: function () {
                    var $t;
                    if (HowlerJsDemo.App._rootDiv != null) {
                        HowlerJsDemo.App._content.removeChild(HowlerJsDemo.App._rootDiv);
                    }

                    HowlerJsDemo.App._rootDiv = ($t = document.createElement("div"), $t.className = "spriteRoot", $t);

                    HowlerJsDemo.App._content.appendChild(HowlerJsDemo.App._rootDiv);

                    HowlerJsDemo.App._sprite = new HowlerJsDemo.SpriteDemo.Sprite(HowlerJsDemo.App._rootDiv, ($t = new HowlerJsDemo.SpriteDemo.SpriteOptions(), $t.Width = System.Array.init([78, 60, 62, 70, 62, 1895], System.Int32), $t.Left = System.Array.init([0, 342, 680, 1022, 1361], System.Int32), $t.Src = System.Array.init(["https://raw.githubusercontent.com/Retyped/Demos/master/HowlerJsDemo/HowlerJsDemo/dist/assets/audio/sound2.webm", "https://raw.githubusercontent.com/Retyped/Demos/master/HowlerJsDemo/HowlerJsDemo/dist/assets/audio/sound2.mp3"], System.String), $t.Sprite = function (_o1) {
                            _o1.one = [0, 450];
                            _o1.two = [2000, 250];
                            _o1.three = [4000, 350];
                            _o1.four = [6000, 380];
                            _o1.five = [8000, 340];
                            _o1.beat = [10000, 11163];
                            return _o1;
                        }(new (Bridge.virtualc("IHowlSoundSpriteDefinition"))()), $t.SpriteNames = System.Array.init(["one", "two", "three", "four", "five", "beat"], System.String), $t));
                }
            }
        }
    });

    /** @namespace HowlerJsDemo.RadioDemo */

    /**
     * Radio class containing the state of our stations.
     Includes all methods for playing, stopping, etc.
     *
     * @public
     * @class HowlerJsDemo.RadioDemo.Radio
     */
    Bridge.define("HowlerJsDemo.RadioDemo.Radio", {
        fields: {
            _stations: null,
            _renderInfo: null,
            _index: 0
        },
        ctors: {
            /**
             * Inits Radio class containing the state of our stations.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.RadioDemo.Radio
             * @memberof HowlerJsDemo.RadioDemo.Radio
             * @param   {Retyped..HTMLElement}                           rootEl      HTML Element will be using as a root element for rendering.
             * @param   {Array.<HowlerJsDemo.RadioDemo.RadioStation>}    stations    Array of objects with station details.
             * @return  {void}
             */
            ctor: function (rootEl, stations) {
                this.$initialize();
                this._index = 0;
                this._stations = stations;
                this._renderInfo = System.Array.init(stations.length, null, HowlerJsDemo.RadioDemo.RadioStationRenderInfo);

                for (var i = 0; i < stations.length; i = (i + 1) | 0) {
                    this._renderInfo[System.Array.index(i, this._renderInfo)] = this.Render(rootEl, stations[System.Array.index(i, stations)], i);
                }
            }
        },
        methods: {
            /**
             * Render station.
             *
             * @instance
             * @private
             * @this HowlerJsDemo.RadioDemo.Radio
             * @memberof HowlerJsDemo.RadioDemo.Radio
             * @param   {Retyped..HTMLElement}                             rootEl          
             * @param   {HowlerJsDemo.RadioDemo.RadioStation}              station         
             * @param   {number}                                           stationIndex
             * @return  {HowlerJsDemo.RadioDemo.RadioStationRenderInfo}
             */
            Render: function (rootEl, station, stationIndex) {
                var $t;
                var stationDiv = ($t = document.createElement("div"), $t.className = "station", $t);
                var titleDiv = ($t = document.createElement("div"), $t.className = "title", $t);

                var subtitleDiv = ($t = document.createElement("div"), $t.className = "subtitle", $t);
                var liveDiv = ($t = document.createElement("div"), $t.className = "live", $t.innerHTML = "LIVE", $t);
                var playingDiv = ($t = document.createElement("div"), $t.className = "playing", $t);

                var rect1Div = ($t = document.createElement("div"), $t.className = "rect1", $t);
                var rect2Div = ($t = document.createElement("div"), $t.className = "rect2", $t);
                var rect3Div = ($t = document.createElement("div"), $t.className = "rect3", $t);
                var rect4Div = ($t = document.createElement("div"), $t.className = "rect4", $t);
                var rect5Div = ($t = document.createElement("div"), $t.className = "rect5", $t);

                playingDiv.appendChild(rect1Div);
                playingDiv.appendChild(rect2Div);
                playingDiv.appendChild(rect3Div);
                playingDiv.appendChild(rect4Div);
                playingDiv.appendChild(rect5Div);

                titleDiv.appendChild(subtitleDiv);
                titleDiv.appendChild(liveDiv);
                titleDiv.appendChild(playingDiv);

                stationDiv.appendChild(titleDiv);

                var renderInfo = ($t = new HowlerJsDemo.RadioDemo.RadioStationRenderInfo(), $t.Station = stationDiv, $t.Title = subtitleDiv, $t.Live = liveDiv, $t.Playing = playingDiv, $t);

                renderInfo.Title.innerHTML = System.String.format("<b>{0}</b> {1}", station.Freq, station.Title);
                renderInfo.Station.addEventListener("click", Bridge.fn.bind(this, function (e) {
                    var isNotPlaying = station.Howl == null || !station.Howl.playing();

                    this.Stop();

                    if (station.Howl == null || isNotPlaying) {
                        this.Play(stationIndex);
                    }
                }));

                rootEl.appendChild(stationDiv);

                return renderInfo;
            },
            /**
             * Play a station with a specific index.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.RadioDemo.Radio
             * @memberof HowlerJsDemo.RadioDemo.Radio
             * @param   {?number}    stationIndex    Index in the array of stations.
             * @return  {void}
             */
            Play: function (stationIndex) {
                var $t;
                if (stationIndex === void 0) { stationIndex = null; }
                var index = ($t = stationIndex, $t != null ? $t : this._index);

                var data = this._stations[System.Array.index(index, this._stations)];

                if (data.Howl == null) {
                    var srcArray = System.Linq.Enumerable.from(data.Sources).select(function (x) {
                            return x.Url;
                        }).ToArray(System.String);
                    var formatArray = System.Linq.Enumerable.from(data.Sources).select(function (x) {
                            return x.Format;
                        }).ToArray(System.String);

                    data.Howl = new Howl({ src: srcArray, html5: true, format: formatArray });
                }

                data.Howl.play();

                this.ToggleStationDisplay(index, true);

                this._index = index;
            },
            /**
             * Stop a station's live stream.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.RadioDemo.Radio
             * @memberof HowlerJsDemo.RadioDemo.Radio
             * @return  {void}
             */
            Stop: function () {
                var sound = this._stations[System.Array.index(this._index, this._stations)].Howl;

                this.ToggleStationDisplay(this._index, false);

                sound != null ? sound.stop() : null;
            },
            /**
             * Toggle the display of a station to off/on.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.RadioDemo.Radio
             * @memberof HowlerJsDemo.RadioDemo.Radio
             * @param   {number}     index    Index of the station to toggle.
             * @param   {boolean}    state    true is on and false is off.
             * @return  {void}
             */
            ToggleStationDisplay: function (index, state) {
                this._renderInfo[System.Array.index(index, this._renderInfo)].Station.style.backgroundColor = state ? "rgba(255, 255, 255, 0.33)" : "";

                this._renderInfo[System.Array.index(index, this._renderInfo)].Live.style.opacity = state ? "1" : "0";

                this._renderInfo[System.Array.index(index, this._renderInfo)].Playing.style.display = state ? "block" : "none";
            }
        }
    });

    /**
     * Contains metadata for a radio station.
     *
     * @public
     * @class HowlerJsDemo.RadioDemo.RadioStation
     */
    Bridge.define("HowlerJsDemo.RadioDemo.RadioStation", {
        fields: {
            Freq: null,
            Title: null,
            Sources: null,
            Howl: null
        }
    });

    /**
     * Radio station display info.
     *
     * @public
     * @class HowlerJsDemo.RadioDemo.RadioStationRenderInfo
     */
    Bridge.define("HowlerJsDemo.RadioDemo.RadioStationRenderInfo", {
        fields: {
            Station: null,
            Title: null,
            Live: null,
            Playing: null
        }
    });

    /**
     * Radio station endpoint data.
     *
     * @public
     * @class HowlerJsDemo.RadioDemo.RadioStationSrc
     */
    Bridge.define("HowlerJsDemo.RadioDemo.RadioStationSrc", {
        fields: {
            Url: null,
            Format: null
        }
    });

    /** @namespace HowlerJsDemo.SpriteDemo */

    /**
     * Sprite class containing the state of our sprites to play and their progress.
     *
     * @public
     * @class HowlerJsDemo.SpriteDemo.Sprite
     */
    Bridge.define("HowlerJsDemo.SpriteDemo.Sprite", {
        statics: {
            fields: {
                DataSetSpriteProp: null
            },
            ctors: {
                init: function () {
                    this.DataSetSpriteProp = "sprite";
                }
            }
        },
        fields: {
            _options: null,
            _sound: null,
            _sounds: null,
            _spriteElms: null
        },
        ctors: {
            init: function () {
                this._sounds = new (System.Collections.Generic.List$1(HTMLDivElement)).ctor();
                this._spriteElms = new (System.Collections.Generic.Dictionary$2(System.String,HTMLDivElement))();
            },
            /**
             * Inits a new Sprite object.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @param   {Retyped..HTMLDivElement}                  rootEl     Root HTML element where sprites will be rendered.
             * @param   {HowlerJsDemo.SpriteDemo.SpriteOptions}    options    Settings to pass into and setup the sound and visuals.
             * @return  {void}
             */
            ctor: function (rootEl, options) {
                this.$initialize();
                this._options = options;
                this.Render(rootEl);

                this._sound = new Howl({ src: options.Src, sprite: options.Sprite });

                window.addEventListener("resize", Bridge.fn.bind(this, function (e) {
                    this.Resize();
                }), false);

                this.Resize();

                requestAnimationFrame(Bridge.fn.cacheBind(this, this.Step));
            }
        },
        methods: {
            /**
             * Render elements and setup the listeners for each sprite click area.
             *
             * @instance
             * @private
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @param   {Retyped..HTMLDivElement}    rootEl
             * @return  {void}
             */
            Render: function (rootEl) {
                var $t, $t1;
                var instructDiv = ($t = document.createElement("div"), $t.className = "instructions", $t);

                var titleSpan = ($t = document.createElement("span"), $t.className = "spriteTitle", $t.innerHTML = "Audio Sprite Visual", $t);

                var descSpan = ($t = document.createElement("span"), $t.className = "description", $t.innerHTML = "Click a section of the waveform to play the sprite.", $t);

                var waveDiv = ($t = document.createElement("div"), $t.id = "waveform", $t);
                var spritesDiv = ($t = document.createElement("div"), $t.className = "sprites", $t);

                instructDiv.appendChild(titleSpan);
                instructDiv.appendChild(document.createElement("br"));
                instructDiv.appendChild(descSpan);

                rootEl.appendChild(instructDiv);
                rootEl.appendChild(waveDiv);
                rootEl.appendChild(spritesDiv);

                var count = 0;
                $t = Bridge.getEnumerator(this._options.SpriteNames);
                try {
                    while ($t.moveNext()) {
                        var spriteName = { v : $t.Current };
                        var spriteDiv = ($t1 = document.createElement("div"), $t1.id = System.String.format("sprite{0}", [Bridge.box(Bridge.identity(count, (count = (count + 1) | 0)), System.Int32)]), $t1.className = "sprite", $t1);

                        spriteDiv.addEventListener("click", (function ($me, spriteName) {
                            return Bridge.fn.bind($me, function (e) {
                                this.Play(spriteName.v);
                            });
                        })(this, spriteName), false);

                        var spriteLabelDiv = ($t1 = document.createElement("div"), $t1.className = "sprite-label", $t1.innerHTML = spriteName.v, $t1);

                        spriteDiv.appendChild(spriteLabelDiv);

                        spritesDiv.appendChild(spriteDiv);

                        this._spriteElms.add(spriteName.v, spriteDiv);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            /**
             * Play a sprite when clicked and track the progress.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @param   {string}    spriteName    Name in a sprite object.
             * @return  {void}
             */
            Play: function (spriteName) {
                var id = this._sound.play(spriteName);

                var elm = function (_o1) {
                        _o1.id = System.Double.format(id);
                        _o1.className = "progress";
                        _o1.dataset[HowlerJsDemo.SpriteDemo.Sprite.DataSetSpriteProp] = spriteName;
                        return _o1;
                    }(document.createElement("div"));

                this._spriteElms.get(spriteName).appendChild(elm);
                this._sounds.add(elm);

                this._sound.once("end", Bridge.fn.bind(this, function () {
                    if (this._sounds.remove(elm)) {
                        this._spriteElms.get(spriteName).removeChild(elm);
                    }
                }), id);
            },
            /**
             * Stop playing.
             *
             * @instance
             * @public
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @return  {void}
             */
            Stop: function () {
                this._sound != null ? this._sound.stop() : null;
            },
            /**
             * Called on window resize to correctly psotion and size the click overlays.
             *
             * @instance
             * @private
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @return  {void}
             */
            Resize: function () {
                var $t, $t1, $t2, $t3;
                var scale = (window.innerWidth - 60) / 3600;

                for (var i = 0; i < this._options.SpriteNames.length; i = (i + 1) | 0) {
                    var spriteName = ($t = this._options.SpriteNames)[System.Array.index(i, $t)];
                    var sprite = this._spriteElms.get(spriteName);

                    sprite.style.width = System.Double.format(Bridge.Math.round(($t1 = this._options.Width)[System.Array.index(i, $t1)] * scale, 0, 6)) + "px";
                    if (i < this._options.Left.length && ($t2 = this._options.Left)[System.Array.index(i, $t2)] > 0) {
                        sprite.style.left = System.Double.format(Bridge.Math.round(($t3 = this._options.Left)[System.Array.index(i, $t3)] * scale, 0, 6)) + "px";
                    }
                }
            },
            /**
             * The step called within requestAnimationFrame to update the playback positions.
             *
             * @instance
             * @private
             * @this HowlerJsDemo.SpriteDemo.Sprite
             * @memberof HowlerJsDemo.SpriteDemo.Sprite
             * @param   {number}    time
             * @return  {void}
             */
            Step: function (time) {
                var $t, $t1;
                $t = Bridge.getEnumerator(this._sounds);
                try {
                    while ($t.moveNext()) {
                        var sound = $t.Current;
                        var id = System.Int32.parse(sound.id, 10);
                        var spriteName = sound.dataset[HowlerJsDemo.SpriteDemo.Sprite.DataSetSpriteProp];

                        var range = this._options.Sprite[spriteName];
                        var offset = range[0];

                        var seek = (($t1 = this._sound.seek(id), $t1 != null ? $t1 : 0)) - (offset / 1000);
                        sound.style.width = System.Double.format((seek / this._sound.duration(id) * 100)) + "%";
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                requestAnimationFrame(Bridge.fn.cacheBind(this, this.Step));
            }
        }
    });

    /**
     * Settings to pass into and setup the sound and visuals.
     *
     * @public
     * @class HowlerJsDemo.SpriteDemo.SpriteOptions
     */
    Bridge.define("HowlerJsDemo.SpriteDemo.SpriteOptions", {
        fields: {
            Width: null,
            Left: null,
            Src: null,
            Sprite: null,
            SpriteNames: null
        }
    });
});
