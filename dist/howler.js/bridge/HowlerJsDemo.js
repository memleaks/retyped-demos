/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
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
            };

            btnSprite.onclick = function (ev) {
                HowlerJsDemo.App._radio != null ? HowlerJsDemo.App._radio.Stop() : null;
                HowlerJsDemo.App._sprite != null ? HowlerJsDemo.App._sprite.Stop() : null;

                HowlerJsDemo.App.RenderSprite();
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
                        var spriteDiv = ($t1 = document.createElement("div"), $t1.id = System.String.format("sprite{0}", [Bridge.identity(count, (count = (count + 1) | 0))]), $t1.className = "sprite", $t1);

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
                var scale = (((window.innerWidth - 60) | 0)) / 3600.0;

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dsZXJKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlJhZGlvRGVtby9SYWRpby5jcyIsIlNwcml0ZURlbW8vU3ByaXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBZ0JZQSw0QkFBV0EsQUFBcUJBOztZQUVoQ0EsZUFBZUEsQUFBK0JBO1lBQzlDQSxnQkFBZ0JBLEFBQStCQTs7WUFFL0NBLG1CQUFtQkE7Z0JBRWZBLDJCQUFRQSxPQUFLQSxBQUFxQ0EsaUNBQWVBO2dCQUNqRUEsNEJBQVNBLE9BQUtBLEFBQXFDQSxrQ0FBZ0JBOztnQkFFbkVBOzs7WUFHSkEsb0JBQW9CQTtnQkFFaEJBLDJCQUFRQSxPQUFLQSxBQUFxQ0EsaUNBQWVBO2dCQUNqRUEsNEJBQVNBLE9BQUtBLEFBQXFDQSxrQ0FBZ0JBOztnQkFFbkVBOzs7WUFJSkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFVQUEsSUFBSUEsNkJBQVlBO3dCQUVaQSxzQ0FBeURBOzs7b0JBSTdEQSw0QkFBV0E7O29CQU1YQSxzQ0FBeURBOztvQkFFekRBLDBCQUFTQSxJQUFJQSw2QkFBTUEsMkJBQVVBLG1CQUV6QkEsVUFBSUEsaUdBSVVBLG1CQUVOQSxXQUFJQSw0SEFDSkEsV0FBSUEsMktBR1pBLFVBQUlBLGlHQUlVQSxtQkFFTkEsV0FBSUEsNEhBQ0pBLFdBQUlBLDJLQUdaQSxVQUFJQSw4RkFJVUEsbUJBRU5BLFdBQUlBLHlIQUNKQSxXQUFJQSx3S0FHWkEsVUFBSUEsa0dBSVVBLG1CQUVOQSxXQUFJQSx1SEFDSkEsV0FBSUEscUtBR1pBLFVBQUlBLDhGQUlVQSxtQkFFTkEsV0FBSUEsd0hBQ0pBLFdBQUlBOzs7Ozs7Ozs7Ozs7O29CQWVoQkEsSUFBSUEsNkJBQVlBO3dCQUVaQSxzQ0FBeURBOzs7b0JBSTdEQSw0QkFBV0E7O29CQUtYQSxzQ0FBeURBOztvQkFFekRBLDJCQUFVQSxJQUFJQSwr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aUJBQVlBLG1CQUF0QkEsWUFBa0NBLENBQUNBO3dCQUMvQ0Esb0JBQW9CQSxzQkFBQ0EsT0FBT0EscUJBQWdCQTs7Ozs7OztnQkFHaERBLHNCQUFrQ0EsQUFBMENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgSG93bGVySnNEZW1vLlJhZGlvRGVtbztcclxudXNpbmcgSG93bGVySnNEZW1vLlNwcml0ZURlbW87XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgSG93bGVySnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfcm9vdERpdjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5FbGVtZW50IF9jb250ZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJhZGlvIF9yYWRpbztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBTcHJpdGUgX3Nwcml0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRlbnQgPSAoUmV0eXBlZC5kb20uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPHN0cmluZz4oXCIjY29udGVudFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidG5SYWRpbyA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPHN0cmluZz4oXCIjYnRuUmFkaW9cIik7XHJcbiAgICAgICAgICAgIHZhciBidG5TcHJpdGUgPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxzdHJpbmc+KFwiI2J0blNwcml0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGJ0blJhZGlvLm9uY2xpY2sgPSBldiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcmFkaW8hPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pl9yYWRpby5TdG9wKCkpOm51bGw7XHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fc3ByaXRlLlN0b3AoKSk6bnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBSZW5kZXJSYWRpbygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYnRuU3ByaXRlLm9uY2xpY2sgPSBldiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcmFkaW8hPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pl9yYWRpby5TdG9wKCkpOm51bGw7XHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fc3ByaXRlLlN0b3AoKSk6bnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBSZW5kZXJTcHJpdGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBSYWRpbyBzYW1wbGUgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICBSZW5kZXJSYWRpbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBSYWRpbyBEZW1vXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gT3JpZ2luYWwgc291cmNlczogaHR0cHM6Ly9naXRodWIuY29tL2dvbGRmaXJlL2hvd2xlci5qcy9ibG9iL2RmM2FhNDM4MDZlNWUzOTMzMTIyNTQ5NDZlMzZhNDUxNGUzYThmNGQvZXhhbXBsZXMvcmFkaW8vcmFkaW8uanNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVuZGVyUmFkaW8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9yb290RGl2ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZW50LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHJvb3QgRGl2IHRvIHRoZSBEb2N1bWVudFxyXG4gICAgICAgICAgICBfcm9vdERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcInJhZGlvUm9vdFwiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7cGFkZGluZyA9IFwiMTAwcHhcIn1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9jb250ZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuXHJcbiAgICAgICAgICAgIF9yYWRpbyA9IG5ldyBSYWRpbyhfcm9vdERpdiwgbmV3W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZyZXEgPSBcIjgxLjRcIixcclxuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IFwiR3Jvb3ZlIFNhbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vZ3Jvb3Zlc2FsYWQtMTI4LW1wM1wiLCBGb3JtYXQgPSBcIm1wM1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL2dyb292ZXNhbGFkLTEyOC1hYWNcIiwgRm9ybWF0ID0gXCJhYWNcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZyZXEgPSBcIjg5LjlcIixcclxuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IFwiU2VjcmV0IEFnZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vc2VjcmV0YWdlbnQtMTI4LW1wM1wiLCBGb3JtYXQgPSBcIm1wM1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL3NlY3JldGFnZW50LTEyOC1hYWNcIiwgRm9ybWF0ID0gXCJhYWNcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZyZXEgPSBcIjk4LjlcIixcclxuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IFwiSW5kaWUgUG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vaW5kaWVwb3AtMTI4LW1wM1wiLCBGb3JtYXQgPSBcIm1wM1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL2luZGllcG9wLTEyOC1hYWNcIiwgRm9ybWF0ID0gXCJhYWNcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZyZXEgPSBcIjEwMy4zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSBcIlBvbGljZSBSYWRpb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL3NmMTAzMy0xMjgtbXAzXCIsIEZvcm1hdCA9IFwibXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UyLnNvbWFmbS5jb20vc2YxMDMzLTY0LWFhY1wiLCBGb3JtYXQgPSBcImFhY1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRnJlcSA9IFwiMTA3LjdcIixcclxuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IFwiVGhlIFRyaXBcIixcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VzID0gbmV3W11cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS90aGV0cmlwLTEyOC1tcDNcIiwgRm9ybWF0ID0gXCJtcDNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTIuc29tYWZtLmNvbS90aGV0cmlwLTY0LWFhY1wiLCBGb3JtYXQgPSBcImFhY1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gU3ByaXRlIERlbW9cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwczovL2dpdGh1Yi5jb20vZ29sZGZpcmUvaG93bGVyLmpzL2Jsb2IvZGYzYWE0MzgwNmU1ZTM5MzMxMjI1NDk0NmUzNmE0NTE0ZTNhOGY0ZC9leGFtcGxlcy9zcHJpdGUvc3ByaXRlLmpzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlclNwcml0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3REaXYgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2NvbnRlbnQucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm9vdCBEaXYgdG8gdGhlIERvY3VtZW50XHJcbiAgICAgICAgICAgIF9yb290RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwic3ByaXRlUm9vdFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfY29udGVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcblxyXG4gICAgICAgICAgICBfc3ByaXRlID0gbmV3IFNwcml0ZShfcm9vdERpdiwgbmV3IFNwcml0ZU9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgV2lkdGggPSBuZXdbXSB7NzgsIDYwLCA2MiwgNzAsIDYyLCAxODk1fSxcclxuICAgICAgICAgICAgICAgIExlZnQgPSBuZXdbXSB7MCwgMzQyLCA2ODAsIDEwMjIsIDEzNjF9LFxyXG4gICAgICAgICAgICAgICAgLy9TcmMgPSBuZXdbXSB7XCJzb3VuZDIud2VibVwiLCBcInNvdW5kMi5tcDNcIn0sXHJcbiAgICAgICAgICAgICAgICBTcmMgPSBuZXdbXSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUmV0eXBlZC9EZW1vcy9tYXN0ZXIvSG93bGVySnNEZW1vL0hvd2xlckpzRGVtby9kaXN0L2Fzc2V0cy9hdWRpby9zb3VuZDIud2VibVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JldHlwZWQvRGVtb3MvbWFzdGVyL0hvd2xlckpzRGVtby9Ib3dsZXJKc0RlbW8vZGlzdC9hc3NldHMvYXVkaW8vc291bmQyLm1wM1wiIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFNwcml0ZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBob3dsZXIuSUhvd2xTb3VuZFNwcml0ZURlZmluaXRpb24oKSwoX28xKT0+e19vMVtcIm9uZVwiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPigwLCA0NTApO19vMVtcInR3b1wiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPigyMDAwLCAyNTApO19vMVtcInRocmVlXCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDQwMDAsIDM1MCk7X28xW1wiZm91clwiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPig2MDAwLCAzODApO19vMVtcImZpdmVcIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oODAwMCwgMzQwKTtfbzFbXCJiZWF0XCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDEwMDAwLCAxMTE2Myk7cmV0dXJuIF9vMTt9KSxcclxuICAgICAgICAgICAgICAgIFNwcml0ZU5hbWVzID0gbmV3W11cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHdvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aHJlZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZm91clwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZml2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYmVhdFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93bGVySnNEZW1vLlJhZGlvRGVtb1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gUmFkaW8gY2xhc3MgY29udGFpbmluZyB0aGUgc3RhdGUgb2Ygb3VyIHN0YXRpb25zLlxyXG4gICAgLy8vIEluY2x1ZGVzIGFsbCBtZXRob2RzIGZvciBwbGF5aW5nLCBzdG9wcGluZywgZXRjLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBSYWRpb1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmFkaW9TdGF0aW9uW10gX3N0YXRpb25zO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmFkaW9TdGF0aW9uUmVuZGVySW5mb1tdIF9yZW5kZXJJbmZvO1xyXG4gICAgICAgIHByaXZhdGUgaW50IF9pbmRleDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBJbml0cyBSYWRpbyBjbGFzcyBjb250YWluaW5nIHRoZSBzdGF0ZSBvZiBvdXIgc3RhdGlvbnMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyb290RWxcIj5IVE1MIEVsZW1lbnQgd2lsbCBiZSB1c2luZyBhcyBhIHJvb3QgZWxlbWVudCBmb3IgcmVuZGVyaW5nLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3RhdGlvbnNcIj5BcnJheSBvZiBvYmplY3RzIHdpdGggc3RhdGlvbiBkZXRhaWxzLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIFJhZGlvKFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IHJvb3RFbCwgUmFkaW9TdGF0aW9uW10gc3RhdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBfc3RhdGlvbnMgPSBzdGF0aW9ucztcclxuICAgICAgICAgICAgX3JlbmRlckluZm8gPSBuZXcgUmFkaW9TdGF0aW9uUmVuZGVySW5mb1tzdGF0aW9ucy5MZW5ndGhdO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGRpc3BsYXkgZm9yIGVhY2ggc3RhdGlvbi5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0aW9ucy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVuZGVyIHN0YXRpb246XHJcbiAgICAgICAgICAgICAgICBfcmVuZGVySW5mb1tpXSA9IFJlbmRlcihyb290RWwsIHN0YXRpb25zW2ldLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZW5kZXIgc3RhdGlvbi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgUmFkaW9TdGF0aW9uUmVuZGVySW5mbyBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdEVsLCBSYWRpb1N0YXRpb24gc3RhdGlvbiwgaW50IHN0YXRpb25JbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0aW9uRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHtjbGFzc05hbWUgPSBcInN0YXRpb25cIn07XHJcbiAgICAgICAgICAgIHZhciB0aXRsZURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwidGl0bGVcIiB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHN1YnRpdGxlRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJzdWJ0aXRsZVwiIH07XHJcbiAgICAgICAgICAgIHZhciBsaXZlRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJsaXZlXCIsIGlubmVySFRNTCA9IFwiTElWRVwifTtcclxuICAgICAgICAgICAgdmFyIHBsYXlpbmdEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInBsYXlpbmdcIiB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlY3QxRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJyZWN0MVwiIH07XHJcbiAgICAgICAgICAgIHZhciByZWN0MkRpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicmVjdDJcIiB9O1xyXG4gICAgICAgICAgICB2YXIgcmVjdDNEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInJlY3QzXCIgfTtcclxuICAgICAgICAgICAgdmFyIHJlY3Q0RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJyZWN0NFwiIH07XHJcbiAgICAgICAgICAgIHZhciByZWN0NURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicmVjdDVcIiB9O1xyXG5cclxuICAgICAgICAgICAgcGxheWluZ0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihyZWN0MURpdik7XHJcbiAgICAgICAgICAgIHBsYXlpbmdEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocmVjdDJEaXYpO1xyXG4gICAgICAgICAgICBwbGF5aW5nRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHJlY3QzRGl2KTtcclxuICAgICAgICAgICAgcGxheWluZ0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihyZWN0NERpdik7XHJcbiAgICAgICAgICAgIHBsYXlpbmdEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocmVjdDVEaXYpO1xyXG5cclxuICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3VidGl0bGVEaXYpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihsaXZlRGl2KTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocGxheWluZ0Rpdik7XHJcblxyXG4gICAgICAgICAgICBzdGF0aW9uRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHRpdGxlRGl2KTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZW5kZXJJbmZvID0gbmV3IFJhZGlvU3RhdGlvblJlbmRlckluZm9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3RhdGlvbiA9IHN0YXRpb25EaXYsXHJcbiAgICAgICAgICAgICAgICBUaXRsZSA9IHN1YnRpdGxlRGl2LFxyXG4gICAgICAgICAgICAgICAgTGl2ZSA9IGxpdmVEaXYsXHJcbiAgICAgICAgICAgICAgICBQbGF5aW5nID0gcGxheWluZ0RpdlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVuZGVySW5mby5UaXRsZS5pbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiPGI+ezB9PC9iPiB7MX1cIixzdGF0aW9uLkZyZXEsc3RhdGlvbi5UaXRsZSk7XHJcbiAgICAgICAgICAgIHJlbmRlckluZm8uU3RhdGlvbi5hZGRFdmVudExpc3RlbmVyPHN0cmluZz4oXCJjbGlja1wiLCAoZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyRm48c3RyaW5nPikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNOb3RQbGF5aW5nID0gc3RhdGlvbi5Ib3dsID09IG51bGwgfHwgIXN0YXRpb24uSG93bC5wbGF5aW5nKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RvcCBvdGhlciBzb3VuZHMgb3IgdGhlIGN1cnJlbnQgb25lLlxyXG4gICAgICAgICAgICAgICAgU3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGF0aW9uIGlzbid0IGFscmVhZHkgcGxheWluZyBvciBpdCBkb2Vzbid0IGV4aXN0LCBwbGF5IGl0LlxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRpb24uSG93bCA9PSBudWxsIHx8IGlzTm90UGxheWluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5KHN0YXRpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdGF0aW9uRGl2KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZW5kZXJJbmZvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQbGF5IGEgc3RhdGlvbiB3aXRoIGEgc3BlY2lmaWMgaW5kZXguXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdGF0aW9uSW5kZXhcIj5JbmRleCBpbiB0aGUgYXJyYXkgb2Ygc3RhdGlvbnMuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQbGF5KGludD8gc3RhdGlvbkluZGV4ID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN0YXRpb25JbmRleCA/PyBfaW5kZXg7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IF9zdGF0aW9uc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBhbHJlYWR5IGxvYWRlZCB0aGlzIHRyYWNrLCB1c2UgdGhlIGN1cnJlbnQgb25lLlxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHNldHVwIGFuZCBsb2FkIGEgbmV3IEhvd2wuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLkhvd2wgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNyY0FycmF5ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8Z2xvYmFsOjpIb3dsZXJKc0RlbW8uUmFkaW9EZW1vLlJhZGlvU3RhdGlvblNyYyxzdHJpbmc+KGRhdGEuU291cmNlcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6Okhvd2xlckpzRGVtby5SYWRpb0RlbW8uUmFkaW9TdGF0aW9uU3JjLCBzdHJpbmc+KSh4ID0+IHguVXJsKSkuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdEFycmF5ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8Z2xvYmFsOjpIb3dsZXJKc0RlbW8uUmFkaW9EZW1vLlJhZGlvU3RhdGlvblNyYyxzdHJpbmc+KGRhdGEuU291cmNlcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6Okhvd2xlckpzRGVtby5SYWRpb0RlbW8uUmFkaW9TdGF0aW9uU3JjLCBzdHJpbmc+KSh4ID0+IHguRm9ybWF0KSkuVG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuSG93bCA9IG5ldyBSZXR5cGVkLmhvd2xlci5Ib3dsKG5ldyBSZXR5cGVkLmhvd2xlci5JSG93bFByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSBzcmNBcnJheSxcclxuICAgICAgICAgICAgICAgICAgICBodG1sNSA9IHRydWUsICAgLy8gQSBsaXZlIHN0cmVhbSBjYW4gb25seSBiZSBwbGF5ZWQgdGhyb3VnaCBIVE1MNSBBdWRpby5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXRBcnJheVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEJlZ2luIHBsYXlpbmcgdGhlIHNvdW5kLlxyXG4gICAgICAgICAgICBkYXRhLkhvd2wucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBkaXNwbGF5LlxyXG4gICAgICAgICAgICBUb2dnbGVTdGF0aW9uRGlzcGxheShpbmRleCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBpbmRleCB3ZSBhcmUgY3VycmVudGx5IHBsYXlpbmcuXHJcbiAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdG9wIGEgc3RhdGlvbidzIGxpdmUgc3RyZWFtLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RvcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIEhvd2wgd2Ugd2FudCB0byBtYW5pcHVsYXRlLlxyXG4gICAgICAgICAgICB2YXIgc291bmQgPSBfc3RhdGlvbnNbX2luZGV4XS5Ib3dsO1xyXG5cclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBkaXNwbGF5LlxyXG4gICAgICAgICAgICBUb2dnbGVTdGF0aW9uRGlzcGxheShfaW5kZXgsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3AgdGhlIHNvdW5kLlxyXG4gICAgICAgICAgICBzb3VuZCE9bnVsbD9zb3VuZC5zdG9wKCk6KEhvd2wpbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVG9nZ2xlIHRoZSBkaXNwbGF5IG9mIGEgc3RhdGlvbiB0byBvZmYvb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJpbmRleFwiPkluZGV4IG9mIHRoZSBzdGF0aW9uIHRvIHRvZ2dsZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN0YXRlXCI+dHJ1ZSBpcyBvbiBhbmQgZmFsc2UgaXMgb2ZmLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVG9nZ2xlU3RhdGlvbkRpc3BsYXkoaW50IGluZGV4LCBib29sIHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSGlnaGxpZ2h0L3VuLWhpZ2hsaWdodCB0aGUgcm93LlxyXG4gICAgICAgICAgICBfcmVuZGVySW5mb1tpbmRleF0uU3RhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdGF0ZSA/IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMzKVwiIDogc3RyaW5nLkVtcHR5O1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdy9oaWRlIHRoZSBcImxpdmVcIiBtYXJrZXIuXHJcbiAgICAgICAgICAgIF9yZW5kZXJJbmZvW2luZGV4XS5MaXZlLnN0eWxlLm9wYWNpdHkgPSBzdGF0ZSA/IFwiMVwiIDogXCIwXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93L2hpZGUgdGhlIFwicGxheWluZ1wiIGFuaW1hdGlvbi5cclxuICAgICAgICAgICAgX3JlbmRlckluZm9baW5kZXhdLlBsYXlpbmcuc3R5bGUuZGlzcGxheSA9IHN0YXRlID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBIb3dsZXJKc0RlbW8uU3ByaXRlRGVtb1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gU3ByaXRlIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHN0YXRlIG9mIG91ciBzcHJpdGVzIHRvIHBsYXkgYW5kIHRoZWlyIHByb2dyZXNzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBTcHJpdGVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IHN0cmluZyBEYXRhU2V0U3ByaXRlUHJvcCA9IFwic3ByaXRlXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgU3ByaXRlT3B0aW9ucyBfb3B0aW9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLmhvd2xlci5Ib3dsIF9zb3VuZDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+IF9zb3VuZHMgPSBuZXcgTGlzdDxSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4gX3Nwcml0ZUVsbXMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PigpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEluaXRzIGEgbmV3IFNwcml0ZSBvYmplY3QuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyb290RWxcIj5Sb290IEhUTUwgZWxlbWVudCB3aGVyZSBzcHJpdGVzIHdpbGwgYmUgcmVuZGVyZWQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+U2V0dGluZ3MgdG8gcGFzcyBpbnRvIGFuZCBzZXR1cCB0aGUgc291bmQgYW5kIHZpc3VhbHMuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgU3ByaXRlKFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHJvb3RFbCwgIFNwcml0ZU9wdGlvbnMgb3B0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSBvcHRpb25zIHRvIGRlZmluZSB0aGlzIHNwcml0ZSBkaXNwbGF5LlxyXG4gICAgICAgICAgICBfb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIFJlbmRlcihyb290RWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIG91ciBhdWRpbyBzcHJpdGUgZGVmaW5pdGlvbi5cclxuICAgICAgICAgICAgX3NvdW5kID0gbmV3IFJldHlwZWQuaG93bGVyLkhvd2woIG5ldyBSZXR5cGVkLmhvd2xlci5JSG93bFByb3BlcnRpZXNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjID0gb3B0aW9ucy5TcmMsXHJcbiAgICAgICAgICAgICAgICBzcHJpdGUgPSBvcHRpb25zLlNwcml0ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIGEgcmVzaXplIGV2ZW50IGFuZCBmaXJlIGl0IHRvIHNldHVwIG91ciBzcHJpdGUgb3ZlcmxheXMuXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmRvbS5FdmVudD4pKChSZXR5cGVkLmRvbS5FdmVudCBlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZXNpemUoKTtcclxuICAgICAgICAgICAgfSksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIFJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQmVnaW4gdGhlIHByb2dyZXNzIHN0ZXAgdGljay5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKChnbG9iYWw6OlJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrKVN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZW5kZXIgZWxlbWVudHMgYW5kIHNldHVwIHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggc3ByaXRlIGNsaWNrIGFyZWEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyb290RWxcIj48L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgcm9vdEVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluc3RydWN0RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJpbnN0cnVjdGlvbnNcIiB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpdGxlU3BhbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJzcHJpdGVUaXRsZVwiLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gXCJBdWRpbyBTcHJpdGUgVmlzdWFsXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXNjU3BhbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gXCJDbGljayBhIHNlY3Rpb24gb2YgdGhlIHdhdmVmb3JtIHRvIHBsYXkgdGhlIHNwcml0ZS5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHdhdmVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBpZCA9IFwid2F2ZWZvcm1cIiB9O1xyXG4gICAgICAgICAgICB2YXIgc3ByaXRlc0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwic3ByaXRlc1wiIH07XHJcblxyXG4gICAgICAgICAgICBpbnN0cnVjdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxTcGFuRWxlbWVudD4odGl0bGVTcGFuKTtcclxuICAgICAgICAgICAgaW5zdHJ1Y3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaW5zdHJ1Y3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnQ+KGRlc2NTcGFuKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpbnN0cnVjdERpdik7XHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pih3YXZlRGl2KTtcclxuICAgICAgICAgICAgcm9vdEVsLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHNwcml0ZXNEaXYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHNwcml0ZU5hbWUgaW4gX29wdGlvbnMuU3ByaXRlTmFtZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IHN0cmluZy5Gb3JtYXQoXCJzcHJpdGV7MH1cIixjb3VudCsrKSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcInNwcml0ZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZURpdi5hZGRFdmVudExpc3RlbmVyPHN0cmluZz4oXCJjbGlja1wiLCAoZ2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyRm48c3RyaW5nPikoZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXkoc3ByaXRlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVMYWJlbERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwic3ByaXRlLWxhYmVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gc3ByaXRlTmFtZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3ByaXRlTGFiZWxEaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZXNEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3ByaXRlRGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlRWxtcy5BZGQoc3ByaXRlTmFtZSwgc3ByaXRlRGl2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQbGF5IGEgc3ByaXRlIHdoZW4gY2xpY2tlZCBhbmQgdHJhY2sgdGhlIHByb2dyZXNzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3ByaXRlTmFtZVwiPk5hbWUgaW4gYSBzcHJpdGUgb2JqZWN0LjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgUGxheShzdHJpbmcgc3ByaXRlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFBsYXkgdGhlIHNwcml0ZSBzb3VuZCBhbmQgY2FwdHVyZSB0aGUgSUQuXHJcbiAgICAgICAgICAgIHZhciBpZCA9IF9zb3VuZC5wbGF5KHNwcml0ZU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcHJvZ3Jlc3MgZWxlbWVudCBhbmQgYmVnaW4gdmlzdWFsbHkgdHJhY2tpbmcgaXQuXHJcbiAgICAgICAgICAgIHZhciBlbG0gPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKSwoX28xKT0+e19vMS5pZD0gaWQuVG9TdHJpbmcoKTtfbzEuY2xhc3NOYW1lPSBcInByb2dyZXNzXCI7X28xLmRhdGFzZXRbRGF0YVNldFNwcml0ZVByb3BdPSBzcHJpdGVOYW1lO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgICAgICBfc3ByaXRlRWxtc1tzcHJpdGVOYW1lXS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihlbG0pO1xyXG4gICAgICAgICAgICBfc291bmRzLkFkZChlbG0pO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB0aGlzIHNvdW5kIGlzIGZpbmlzaGVkLCByZW1vdmUgdGhlIHByb2dyZXNzIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIF9zb3VuZC5vbmNlKFwiZW5kXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc291bmRzLlJlbW92ZShlbG0pKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zcHJpdGVFbG1zW3Nwcml0ZU5hbWVdLnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGVsbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN0b3AgcGxheWluZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN0b3AoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NvdW5kIT1udWxsP19zb3VuZC5zdG9wKCk6KEhvd2wpbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsbGVkIG9uIHdpbmRvdyByZXNpemUgdG8gY29ycmVjdGx5IHBzb3Rpb24gYW5kIHNpemUgdGhlIGNsaWNrIG92ZXJsYXlzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlIG9mIG91ciB3aW5kb3cgZnJvbSBcImZ1bGxcIiBzaXplLlxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAoUmV0eXBlZC5kb20ud2luZG93IC5pbm5lcldpZHRoIC0gNjApIC8gMzYwMC4wOyAvLyA2MCBpcyBtYXJnaW4gd2lkdGhcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2l6ZSBhbmQgcmVwb3NpdGlvbiB0aGUgc3ByaXRlIG92ZXJsYXlzLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9vcHRpb25zLlNwcml0ZU5hbWVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaXRlTmFtZSA9IF9vcHRpb25zLlNwcml0ZU5hbWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwcml0ZSA9IF9zcHJpdGVFbG1zW3Nwcml0ZU5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZS5zdHlsZS53aWR0aCA9IE1hdGguUm91bmQoX29wdGlvbnMuV2lkdGhbaV0gKiBzY2FsZSkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IF9vcHRpb25zLkxlZnQuTGVuZ3RoICYmIF9vcHRpb25zLkxlZnRbaV0gPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zdHlsZS5sZWZ0ID0gTWF0aC5Sb3VuZChfb3B0aW9ucy5MZWZ0W2ldICogc2NhbGUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBzdGVwIGNhbGxlZCB3aXRoaW4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHVwZGF0ZSB0aGUgcGxheWJhY2sgcG9zaXRpb25zLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFN0ZXAoZG91YmxlIHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIGFjdGl2ZSBzb3VuZHMgYW5kIHVwZGF0ZSB0aGVpciBwcm9ncmVzcyBiYXIuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBzb3VuZCBpbiBfc291bmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBpbnQuUGFyc2Uoc291bmQuaWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVOYW1lID0gKHN0cmluZykgc291bmQuZGF0YXNldFtEYXRhU2V0U3ByaXRlUHJvcF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gKEJyaWRnZS5TZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4pIF9vcHRpb25zLlNwcml0ZVtzcHJpdGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSByYW5nZS5JdGVtMTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VlayA9ICgoZG91YmxlPykgX3NvdW5kLnNlZWsoaWQpID8/IDApIC0gKG9mZnNldCAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgc291bmQuc3R5bGUud2lkdGggPSAoc2VlayAvIF9zb3VuZC5kdXJhdGlvbihpZCkgKiAxMDApICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaylTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
