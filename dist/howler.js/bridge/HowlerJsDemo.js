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
                var scale = (Bridge.Int.div((((window.innerWidth - 60) | 0)), 3600)) | 0;

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dsZXJKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlJhZGlvRGVtby9SYWRpby5jcyIsIlNwcml0ZURlbW8vU3ByaXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBZ0JZQSw0QkFBV0EsQUFBcUJBOztZQUVoQ0EsZUFBZUEsQUFBK0JBO1lBQzlDQSxnQkFBZ0JBLEFBQStCQTs7WUFFL0NBLG1CQUFtQkE7Z0JBRWZBLDJCQUFRQSxPQUFLQSxBQUFxQ0EsaUNBQWVBO2dCQUNqRUEsNEJBQVNBLE9BQUtBLEFBQXFDQSxrQ0FBZ0JBOztnQkFFbkVBOzs7WUFHSkEsb0JBQW9CQTtnQkFFaEJBLDJCQUFRQSxPQUFLQSxBQUFxQ0EsaUNBQWVBO2dCQUNqRUEsNEJBQVNBLE9BQUtBLEFBQXFDQSxrQ0FBZ0JBOztnQkFFbkVBOzs7WUFJSkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFVQUEsSUFBSUEsNkJBQVlBO3dCQUVaQSxzQ0FBeURBOzs7b0JBSTdEQSw0QkFBV0E7O29CQU1YQSxzQ0FBeURBOztvQkFFekRBLDBCQUFTQSxJQUFJQSw2QkFBTUEsMkJBQVVBLG1CQUV6QkEsVUFBSUEsaUdBSVVBLG1CQUVOQSxXQUFJQSw0SEFDSkEsV0FBSUEsMktBR1pBLFVBQUlBLGlHQUlVQSxtQkFFTkEsV0FBSUEsNEhBQ0pBLFdBQUlBLDJLQUdaQSxVQUFJQSw4RkFJVUEsbUJBRU5BLFdBQUlBLHlIQUNKQSxXQUFJQSx3S0FHWkEsVUFBSUEsa0dBSVVBLG1CQUVOQSxXQUFJQSx1SEFDSkEsV0FBSUEscUtBR1pBLFVBQUlBLDhGQUlVQSxtQkFFTkEsV0FBSUEsd0hBQ0pBLFdBQUlBOzs7Ozs7Ozs7Ozs7O29CQWVoQkEsSUFBSUEsNkJBQVlBO3dCQUVaQSxzQ0FBeURBOzs7b0JBSTdEQSw0QkFBV0E7O29CQUtYQSxzQ0FBeURBOztvQkFFekRBLDJCQUFVQSxJQUFJQSwrQkFBT0EsMkJBQVVBLFVBQUlBLG9EQUV2QkEsdUVBQ0RBLHFFQUVEQSxtUkFJR0EsQUFBc0VBLFVBQUNBOzRCQUFPQSxVQUFZQTs0QkFBcUNBLFVBQVlBOzRCQUF3Q0EsWUFBY0E7NEJBQXdDQSxXQUFhQTs0QkFBd0NBLFdBQWFBOzRCQUF3Q0EsV0FBYUE7NEJBQTJDQSxPQUFPQTswQkFBcFhBLEtBQUlBLG9FQUM3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNsSVRBLFFBQWdDQTs7Z0JBRXpDQTtnQkFDQUEsaUJBQVlBO2dCQUNaQSxtQkFBY0Esa0JBQTJCQTs7Z0JBR3pDQSxLQUFLQSxXQUFXQSxJQUFJQSxpQkFBaUJBO29CQUdqQ0Esb0NBQVlBLEdBQVpBLHFCQUFpQkEsWUFBT0EsUUFBUUEsNEJBQVNBLEdBQVRBLFlBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFPZkEsUUFBZ0NBLFNBQXNCQTs7Z0JBRXhGQSxpQkFBaUJBO2dCQUNqQkEsZUFBZUE7O2dCQUVmQSxrQkFBa0JBO2dCQUNsQkEsY0FBY0E7Z0JBQ2RBLGlCQUFpQkE7O2dCQUVqQkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBOztnQkFFZkEsdUJBQTJEQTtnQkFDM0RBLHVCQUEyREE7Z0JBQzNEQSx1QkFBMkRBO2dCQUMzREEsdUJBQTJEQTtnQkFDM0RBLHVCQUEyREE7O2dCQUUzREEscUJBQXlEQTtnQkFDekRBLHFCQUF5REE7Z0JBQ3pEQSxxQkFBeURBOztnQkFFekRBLHVCQUEyREE7O2dCQUUzREEsaUJBQWlCQSxVQUFJQSw4REFFUEEsdUJBQ0ZBLHVCQUNEQSxzQkFDR0E7O2dCQUdkQSw2QkFBNkJBLHVDQUErQkEsY0FBYUE7Z0JBQ3pFQSw2Q0FBcURBLEFBQWdFQTtvQkFFakhBLG1CQUFtQkEsZ0JBQWdCQSxRQUFRQSxDQUFDQTs7b0JBRzVDQTs7b0JBR0FBLElBQUlBLGdCQUFnQkEsUUFBUUE7d0JBRXhCQSxVQUFLQTs7OztnQkFJYkEsbUJBQXVEQTs7Z0JBRXZEQSxPQUFPQTs7Ozs7Ozs7Ozs7OzRCQU9NQTs7O2dCQUViQSxZQUFZQSxzQ0FBZ0JBOztnQkFFNUJBLFdBQVdBLGtDQUFVQSxPQUFWQTs7Z0JBSVhBLElBQUlBLGFBQWFBO29CQUViQSxlQUFlQSw0QkFBcUZBLHFCQUFhQSxBQUE4RUE7bUNBQUtBOztvQkFDcE1BLGtCQUFrQkEsNEJBQXFGQSxxQkFBYUEsQUFBOEVBO21DQUFLQTs7O29CQUV2TUEsWUFBWUEsSUFBSUEsS0FBb0JBLE9BRTFCQSwrQkFFR0E7OztnQkFLakJBOztnQkFHQUEsMEJBQXFCQTs7Z0JBR3JCQSxjQUFTQTs7Ozs7Ozs7Ozs7O2dCQVNUQSxZQUFZQSxrQ0FBVUEsYUFBVkE7O2dCQUdaQSwwQkFBcUJBOztnQkFHckJBLFNBQU9BLE9BQUtBLGVBQWFBLEFBQU1BOzs7Ozs7Ozs7Ozs7OzRDQVFGQSxPQUFXQTtnQkFHeENBLG9DQUFZQSxPQUFaQSxtREFBbURBLHNDQUFzQ0E7O2dCQUd6RkEsb0NBQVlBLE9BQVpBLHdDQUF3Q0E7O2dCQUd4Q0Esb0NBQVlBLE9BQVpBLDJDQUEyQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkM1SWFBLEtBQUlBO21DQUNjQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozs0QkFPcEVBLFFBQW9DQTs7Z0JBRzlDQSxnQkFBV0E7Z0JBQ1hBLFlBQU9BOztnQkFHUEEsY0FBU0EsSUFBSUEsS0FBcUJBLE9BRXhCQSxxQkFDR0E7O2dCQUliQSxrQ0FBOENBLEFBQW1EQSwrQkFBQ0E7b0JBRTlGQTs7O2dCQUdKQTs7Z0JBR0FBLHNCQUFrQ0EsQUFBMENBOzs7Ozs7Ozs7Ozs7Ozs4QkFPNURBOztnQkFFaEJBLGtCQUFrQkE7O2dCQUVsQkEsZ0JBQWdCQTs7Z0JBTWhCQSxlQUFlQTs7Z0JBTWZBLGNBQWNBO2dCQUNkQSxpQkFBaUJBOztnQkFFakJBLHdCQUE2REE7Z0JBQzdEQSx3QkFBMkRBO2dCQUMzREEsd0JBQTZEQTs7Z0JBRTdEQSxtQkFBdURBO2dCQUN2REEsbUJBQXVEQTtnQkFDdkRBLG1CQUF1REE7O2dCQUV2REE7Z0JBQ0FBLDBCQUEyQkE7Ozs7d0JBRXZCQSxnQkFBZ0JBLCtDQUVQQSxtREFBMEJBOzt3QkFJbkNBLG9DQUE0Q0EsQUFBZ0VBOztnQ0FFeEdBLFVBQUtBOzs7O3dCQUdUQSxxQkFBcUJBLHNGQUdMQTs7d0JBR2hCQSxzQkFBMERBOzt3QkFFMURBLHVCQUEyREE7O3dCQUUzREEscUJBQWdCQSxjQUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBUW5CQTtnQkFHYkEsU0FBU0EsaUJBQVlBOztnQkFHckJBLFVBQVVBLEFBQStEQSxVQUFDQTt3QkFBT0EsU0FBUUE7d0JBQWNBO3dCQUEwQkEsWUFBWUEsb0RBQW9CQTt3QkFBV0EsT0FBT0E7c0JBQTNJQTs7Z0JBRXhDQSxxQkFBWUEsd0JBQTREQTtnQkFDeEVBLGlCQUFZQTs7Z0JBR1pBLHdCQUFtQkEsQUFBd0JBO29CQUV2Q0EsSUFBSUEsb0JBQWVBO3dCQUVmQSxxQkFBWUEsd0JBQTREQTs7b0JBRTVFQTs7Ozs7Ozs7Ozs7O2dCQVFKQSxlQUFRQSxPQUFLQSxxQkFBY0EsQUFBTUE7Ozs7Ozs7Ozs7Ozs7Z0JBU2pDQSxZQUFZQSxpQkFBQ0E7O2dCQUdiQSxLQUFLQSxXQUFXQSxJQUFJQSxrQ0FBNkJBO29CQUU3Q0EsaUJBQWlCQSxvREFBcUJBO29CQUN0Q0EsYUFBYUEscUJBQVlBOztvQkFFekJBLHFCQUFxQkEsdUNBQVdBLCtDQUFlQSxXQUFLQSxBQUFRQTtvQkFDNURBLElBQUlBLElBQUlBLDZCQUF3QkEsOENBQWNBO3dCQUUxQ0Esb0JBQW9CQSx1Q0FBV0EsOENBQWNBLFdBQUtBLEFBQVFBOzs7Ozs7Ozs7Ozs7Ozs0QkFRcERBOztnQkFHZEEsMEJBQXNCQTs7Ozt3QkFFbEJBLFNBQVNBLG1CQUFVQTt3QkFDbkJBLGlCQUFpQkEsQUFBU0EsY0FBY0E7O3dCQUV4Q0EsWUFBWUEsQUFBa0NBLHFCQUFnQkE7d0JBQzlEQSxhQUFhQTs7d0JBRWJBLFdBQVdBLENBQUNBLE9BQVVBLGlCQUFZQSxtQkFBdEJBLFlBQWtDQSxDQUFDQTt3QkFDL0NBLG9CQUFvQkEsc0JBQUNBLE9BQU9BLHFCQUFnQkE7Ozs7Ozs7Z0JBR2hEQSxzQkFBa0NBLEFBQTBDQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEhvd2xlckpzRGVtby5SYWRpb0RlbW87XHJcbnVzaW5nIEhvd2xlckpzRGVtby5TcHJpdGVEZW1vO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEhvd2xlckpzRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgX3Jvb3REaXY7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5kb20uRWxlbWVudCBfY29udGVudDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSYWRpbyBfcmFkaW87XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgU3ByaXRlIF9zcHJpdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZW50ID0gKFJldHlwZWQuZG9tLkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxzdHJpbmc+KFwiI2NvbnRlbnRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnRuUmFkaW8gPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxzdHJpbmc+KFwiI2J0blJhZGlvXCIpO1xyXG4gICAgICAgICAgICB2YXIgYnRuU3ByaXRlID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNidG5TcHJpdGVcIik7XHJcblxyXG4gICAgICAgICAgICBidG5SYWRpby5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3JhZGlvIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fcmFkaW8uU3RvcCgpKTpudWxsO1xyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+X3Nwcml0ZS5TdG9wKCkpOm51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgUmVuZGVyUmFkaW8oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGJ0blNwcml0ZS5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3JhZGlvIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fcmFkaW8uU3RvcCgpKTpudWxsO1xyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+X3Nwcml0ZS5TdG9wKCkpOm51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgUmVuZGVyU3ByaXRlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBSZW5kZXIgUmFkaW8gc2FtcGxlIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgUmVuZGVyUmFkaW8oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNyZWdpb24gUmFkaW8gRGVtb1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9nb2xkZmlyZS9ob3dsZXIuanMvYmxvYi9kZjNhYTQzODA2ZTVlMzkzMzEyMjU0OTQ2ZTM2YTQ1MTRlM2E4ZjRkL2V4YW1wbGVzL3JhZGlvL3JhZGlvLmpzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlclJhZGlvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcm9vdERpdiAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29udGVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb290IERpdiB0byB0aGUgRG9jdW1lbnRcclxuICAgICAgICAgICAgX3Jvb3REaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJyYWRpb1Jvb3RcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlID0ge3BhZGRpbmcgPSBcIjEwMHB4XCJ9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfY29udGVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcblxyXG4gICAgICAgICAgICBfcmFkaW8gPSBuZXcgUmFkaW8oX3Jvb3REaXYsIG5ld1tdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGcmVxID0gXCI4MS40XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSBcIkdyb292ZSBTYWxhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL2dyb292ZXNhbGFkLTEyOC1tcDNcIiwgRm9ybWF0ID0gXCJtcDNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9ncm9vdmVzYWxhZC0xMjgtYWFjXCIsIEZvcm1hdCA9IFwiYWFjXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGcmVxID0gXCI4OS45XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSBcIlNlY3JldCBBZ2VudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL3NlY3JldGFnZW50LTEyOC1tcDNcIiwgRm9ybWF0ID0gXCJtcDNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9zZWNyZXRhZ2VudC0xMjgtYWFjXCIsIEZvcm1hdCA9IFwiYWFjXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGcmVxID0gXCI5OC45XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSBcIkluZGllIFBvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL2luZGllcG9wLTEyOC1tcDNcIiwgRm9ybWF0ID0gXCJtcDNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9pbmRpZXBvcC0xMjgtYWFjXCIsIEZvcm1hdCA9IFwiYWFjXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGcmVxID0gXCIxMDMuM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gXCJQb2xpY2UgUmFkaW9cIixcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VzID0gbmV3W11cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9zZjEwMzMtMTI4LW1wM1wiLCBGb3JtYXQgPSBcIm1wM1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMi5zb21hZm0uY29tL3NmMTAzMy02NC1hYWNcIiwgRm9ybWF0ID0gXCJhYWNcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZyZXEgPSBcIjEwNy43XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSBcIlRoZSBUcmlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vdGhldHJpcC0xMjgtbXAzXCIsIEZvcm1hdCA9IFwibXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UyLnNvbWFmbS5jb20vdGhldHJpcC02NC1hYWNcIiwgRm9ybWF0ID0gXCJhYWNcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIFNwcml0ZSBEZW1vXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gT3JpZ2luYWwgc291cmNlczogaHR0cHM6Ly9naXRodWIuY29tL2dvbGRmaXJlL2hvd2xlci5qcy9ibG9iL2RmM2FhNDM4MDZlNWUzOTMzMTIyNTQ5NDZlMzZhNDUxNGUzYThmNGQvZXhhbXBsZXMvc3ByaXRlL3Nwcml0ZS5qc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW5kZXJTcHJpdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9yb290RGl2ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZW50LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHJvb3QgRGl2IHRvIHRoZSBEb2N1bWVudFxyXG4gICAgICAgICAgICBfcm9vdERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcInNwcml0ZVJvb3RcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX2NvbnRlbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG5cclxuICAgICAgICAgICAgX3Nwcml0ZSA9IG5ldyBTcHJpdGUoX3Jvb3REaXYsIG5ldyBTcHJpdGVPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFdpZHRoID0gbmV3W10gezc4LCA2MCwgNjIsIDcwLCA2MiwgMTg5NX0sXHJcbiAgICAgICAgICAgICAgICBMZWZ0ID0gbmV3W10gezAsIDM0MiwgNjgwLCAxMDIyLCAxMzYxfSxcclxuICAgICAgICAgICAgICAgIC8vU3JjID0gbmV3W10ge1wic291bmQyLndlYm1cIiwgXCJzb3VuZDIubXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgU3JjID0gbmV3W10ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JldHlwZWQvRGVtb3MvbWFzdGVyL0hvd2xlckpzRGVtby9Ib3dsZXJKc0RlbW8vZGlzdC9hc3NldHMvYXVkaW8vc291bmQyLndlYm1cIixcclxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SZXR5cGVkL0RlbW9zL21hc3Rlci9Ib3dsZXJKc0RlbW8vSG93bGVySnNEZW1vL2Rpc3QvYXNzZXRzL2F1ZGlvL3NvdW5kMi5tcDNcIiBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBTcHJpdGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgaG93bGVyLklIb3dsU291bmRTcHJpdGVEZWZpbml0aW9uKCksKF9vMSk9PntfbzFbXCJvbmVcIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oMCwgNDUwKTtfbzFbXCJ0d29cIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oMjAwMCwgMjUwKTtfbzFbXCJ0aHJlZVwiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPig0MDAwLCAzNTApO19vMVtcImZvdXJcIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oNjAwMCwgMzgwKTtfbzFbXCJmaXZlXCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDgwMDAsIDM0MCk7X28xW1wiYmVhdFwiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPigxMDAwMCwgMTExNjMpO3JldHVybiBfbzE7fSksXHJcbiAgICAgICAgICAgICAgICBTcHJpdGVOYW1lcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR3b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGhyZWVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImZvdXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImZpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImJlYXRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd2xlckpzRGVtby5SYWRpb0RlbW9cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFJhZGlvIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHN0YXRlIG9mIG91ciBzdGF0aW9ucy5cclxuICAgIC8vLyBJbmNsdWRlcyBhbGwgbWV0aG9kcyBmb3IgcGxheWluZywgc3RvcHBpbmcsIGV0Yy5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUmFkaW9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJhZGlvU3RhdGlvbltdIF9zdGF0aW9ucztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJhZGlvU3RhdGlvblJlbmRlckluZm9bXSBfcmVuZGVySW5mbztcclxuICAgICAgICBwcml2YXRlIGludCBfaW5kZXg7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSW5pdHMgUmFkaW8gY2xhc3MgY29udGFpbmluZyB0aGUgc3RhdGUgb2Ygb3VyIHN0YXRpb25zLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicm9vdEVsXCI+SFRNTCBFbGVtZW50IHdpbGwgYmUgdXNpbmcgYXMgYSByb290IGVsZW1lbnQgZm9yIHJlbmRlcmluZy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN0YXRpb25zXCI+QXJyYXkgb2Ygb2JqZWN0cyB3aXRoIHN0YXRpb24gZGV0YWlscy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBSYWRpbyhSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290RWwsIFJhZGlvU3RhdGlvbltdIHN0YXRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgX3N0YXRpb25zID0gc3RhdGlvbnM7XHJcbiAgICAgICAgICAgIF9yZW5kZXJJbmZvID0gbmV3IFJhZGlvU3RhdGlvblJlbmRlckluZm9bc3RhdGlvbnMuTGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSBkaXNwbGF5IGZvciBlYWNoIHN0YXRpb24uXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGlvbnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciBzdGF0aW9uOlxyXG4gICAgICAgICAgICAgICAgX3JlbmRlckluZm9baV0gPSBSZW5kZXIocm9vdEVsLCBzdGF0aW9uc1tpXSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVuZGVyIHN0YXRpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIFJhZGlvU3RhdGlvblJlbmRlckluZm8gUmVuZGVyKFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IHJvb3RFbCwgUmFkaW9TdGF0aW9uIHN0YXRpb24sIGludCBzdGF0aW9uSW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGlvbkRpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7Y2xhc3NOYW1lID0gXCJzdGF0aW9uXCJ9O1xyXG4gICAgICAgICAgICB2YXIgdGl0bGVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInRpdGxlXCIgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdWJ0aXRsZURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwic3VidGl0bGVcIiB9O1xyXG4gICAgICAgICAgICB2YXIgbGl2ZURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwibGl2ZVwiLCBpbm5lckhUTUwgPSBcIkxJVkVcIn07XHJcbiAgICAgICAgICAgIHZhciBwbGF5aW5nRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJwbGF5aW5nXCIgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWN0MURpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicmVjdDFcIiB9O1xyXG4gICAgICAgICAgICB2YXIgcmVjdDJEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInJlY3QyXCIgfTtcclxuICAgICAgICAgICAgdmFyIHJlY3QzRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJyZWN0M1wiIH07XHJcbiAgICAgICAgICAgIHZhciByZWN0NERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicmVjdDRcIiB9O1xyXG4gICAgICAgICAgICB2YXIgcmVjdDVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInJlY3Q1XCIgfTtcclxuXHJcbiAgICAgICAgICAgIHBsYXlpbmdEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocmVjdDFEaXYpO1xyXG4gICAgICAgICAgICBwbGF5aW5nRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHJlY3QyRGl2KTtcclxuICAgICAgICAgICAgcGxheWluZ0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihyZWN0M0Rpdik7XHJcbiAgICAgICAgICAgIHBsYXlpbmdEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocmVjdDREaXYpO1xyXG4gICAgICAgICAgICBwbGF5aW5nRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHJlY3Q1RGl2KTtcclxuXHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHN1YnRpdGxlRGl2KTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4obGl2ZURpdik7XHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHBsYXlpbmdEaXYpO1xyXG5cclxuICAgICAgICAgICAgc3RhdGlvbkRpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pih0aXRsZURpdik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVuZGVySW5mbyA9IG5ldyBSYWRpb1N0YXRpb25SZW5kZXJJbmZvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN0YXRpb24gPSBzdGF0aW9uRGl2LFxyXG4gICAgICAgICAgICAgICAgVGl0bGUgPSBzdWJ0aXRsZURpdixcclxuICAgICAgICAgICAgICAgIExpdmUgPSBsaXZlRGl2LFxyXG4gICAgICAgICAgICAgICAgUGxheWluZyA9IHBsYXlpbmdEaXZcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlckluZm8uVGl0bGUuaW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIjxiPnswfTwvYj4gezF9XCIsc3RhdGlvbi5GcmVxLHN0YXRpb24uVGl0bGUpO1xyXG4gICAgICAgICAgICByZW5kZXJJbmZvLlN0YXRpb24uYWRkRXZlbnRMaXN0ZW5lcjxzdHJpbmc+KFwiY2xpY2tcIiwgKGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lckZuPHN0cmluZz4pKGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzTm90UGxheWluZyA9IHN0YXRpb24uSG93bCA9PSBudWxsIHx8ICFzdGF0aW9uLkhvd2wucGxheWluZygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0b3Agb3RoZXIgc291bmRzIG9yIHRoZSBjdXJyZW50IG9uZS5cclxuICAgICAgICAgICAgICAgIFN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc3RhdGlvbiBpc24ndCBhbHJlYWR5IHBsYXlpbmcgb3IgaXQgZG9lc24ndCBleGlzdCwgcGxheSBpdC5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0aW9uLkhvd2wgPT0gbnVsbCB8fCBpc05vdFBsYXlpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheShzdGF0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3RhdGlvbkRpdik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVuZGVySW5mbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGxheSBhIHN0YXRpb24gd2l0aCBhIHNwZWNpZmljIGluZGV4LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3RhdGlvbkluZGV4XCI+SW5kZXggaW4gdGhlIGFycmF5IG9mIHN0YXRpb25zLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgUGxheShpbnQ/IHN0YXRpb25JbmRleCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzdGF0aW9uSW5kZXggPz8gX2luZGV4O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBfc3RhdGlvbnNbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2UgYWxyZWFkeSBsb2FkZWQgdGhpcyB0cmFjaywgdXNlIHRoZSBjdXJyZW50IG9uZS5cclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBzZXR1cCBhbmQgbG9hZCBhIG5ldyBIb3dsLlxyXG4gICAgICAgICAgICBpZiAoZGF0YS5Ib3dsID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcmNBcnJheSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGdsb2JhbDo6SG93bGVySnNEZW1vLlJhZGlvRGVtby5SYWRpb1N0YXRpb25TcmMsc3RyaW5nPihkYXRhLlNvdXJjZXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIb3dsZXJKc0RlbW8uUmFkaW9EZW1vLlJhZGlvU3RhdGlvblNyYywgc3RyaW5nPikoeCA9PiB4LlVybCkpLlRvQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtYXRBcnJheSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGdsb2JhbDo6SG93bGVySnNEZW1vLlJhZGlvRGVtby5SYWRpb1N0YXRpb25TcmMsc3RyaW5nPihkYXRhLlNvdXJjZXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIb3dsZXJKc0RlbW8uUmFkaW9EZW1vLlJhZGlvU3RhdGlvblNyYywgc3RyaW5nPikoeCA9PiB4LkZvcm1hdCkpLlRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLkhvd2wgPSBuZXcgUmV0eXBlZC5ob3dsZXIuSG93bChuZXcgUmV0eXBlZC5ob3dsZXIuSUhvd2xQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gc3JjQXJyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbDUgPSB0cnVlLCAgIC8vIEEgbGl2ZSBzdHJlYW0gY2FuIG9ubHkgYmUgcGxheWVkIHRocm91Z2ggSFRNTDUgQXVkaW8uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0QXJyYXlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBCZWdpbiBwbGF5aW5nIHRoZSBzb3VuZC5cclxuICAgICAgICAgICAgZGF0YS5Ib3dsLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgZGlzcGxheS5cclxuICAgICAgICAgICAgVG9nZ2xlU3RhdGlvbkRpc3BsYXkoaW5kZXgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgaW5kZXggd2UgYXJlIGN1cnJlbnRseSBwbGF5aW5nLlxyXG4gICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3RvcCBhIHN0YXRpb24ncyBsaXZlIHN0cmVhbS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN0b3AoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBIb3dsIHdlIHdhbnQgdG8gbWFuaXB1bGF0ZS5cclxuICAgICAgICAgICAgdmFyIHNvdW5kID0gX3N0YXRpb25zW19pbmRleF0uSG93bDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgZGlzcGxheS5cclxuICAgICAgICAgICAgVG9nZ2xlU3RhdGlvbkRpc3BsYXkoX2luZGV4LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdG9wIHRoZSBzb3VuZC5cclxuICAgICAgICAgICAgc291bmQhPW51bGw/c291bmQuc3RvcCgpOihIb3dsKW51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRvZ2dsZSB0aGUgZGlzcGxheSBvZiBhIHN0YXRpb24gdG8gb2ZmL29uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiaW5kZXhcIj5JbmRleCBvZiB0aGUgc3RhdGlvbiB0byB0b2dnbGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdGF0ZVwiPnRydWUgaXMgb24gYW5kIGZhbHNlIGlzIG9mZi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRvZ2dsZVN0YXRpb25EaXNwbGF5KGludCBpbmRleCwgYm9vbCBzdGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEhpZ2hsaWdodC91bi1oaWdobGlnaHQgdGhlIHJvdy5cclxuICAgICAgICAgICAgX3JlbmRlckluZm9baW5kZXhdLlN0YXRpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3RhdGUgPyBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zMylcIiA6IHN0cmluZy5FbXB0eTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cvaGlkZSB0aGUgXCJsaXZlXCIgbWFya2VyLlxyXG4gICAgICAgICAgICBfcmVuZGVySW5mb1tpbmRleF0uTGl2ZS5zdHlsZS5vcGFjaXR5ID0gc3RhdGUgPyBcIjFcIiA6IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdy9oaWRlIHRoZSBcInBsYXlpbmdcIiBhbmltYXRpb24uXHJcbiAgICAgICAgICAgIF9yZW5kZXJJbmZvW2luZGV4XS5QbGF5aW5nLnN0eWxlLmRpc3BsYXkgPSBzdGF0ZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgSG93bGVySnNEZW1vLlNwcml0ZURlbW9cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFNwcml0ZSBjbGFzcyBjb250YWluaW5nIHRoZSBzdGF0ZSBvZiBvdXIgc3ByaXRlcyB0byBwbGF5IGFuZCB0aGVpciBwcm9ncmVzcy5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBzdHJpbmcgRGF0YVNldFNwcml0ZVByb3AgPSBcInNwcml0ZVwiO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFNwcml0ZU9wdGlvbnMgX29wdGlvbnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5ob3dsZXIuSG93bCBfc291bmQ7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PiBfc291bmRzID0gbmV3IExpc3Q8UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+IF9zcHJpdGVFbG1zID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oKTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBJbml0cyBhIG5ldyBTcHJpdGUgb2JqZWN0LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicm9vdEVsXCI+Um9vdCBIVE1MIGVsZW1lbnQgd2hlcmUgc3ByaXRlcyB3aWxsIGJlIHJlbmRlcmVkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPlNldHRpbmdzIHRvIHBhc3MgaW50byBhbmQgc2V0dXAgdGhlIHNvdW5kIGFuZCB2aXN1YWxzLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIFNwcml0ZShSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCByb290RWwsICBTcHJpdGVPcHRpb25zIG9wdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgb3B0aW9ucyB0byBkZWZpbmUgdGhpcyBzcHJpdGUgZGlzcGxheS5cclxuICAgICAgICAgICAgX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICBSZW5kZXIocm9vdEVsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBvdXIgYXVkaW8gc3ByaXRlIGRlZmluaXRpb24uXHJcbiAgICAgICAgICAgIF9zb3VuZCA9IG5ldyBSZXR5cGVkLmhvd2xlci5Ib3dsKCBuZXcgUmV0eXBlZC5ob3dsZXIuSUhvd2xQcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYyA9IG9wdGlvbnMuU3JjLFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlID0gb3B0aW9ucy5TcHJpdGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBhIHJlc2l6ZSBldmVudCBhbmQgZmlyZSBpdCB0byBzZXR1cCBvdXIgc3ByaXRlIG92ZXJsYXlzLlxyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KSgoUmV0eXBlZC5kb20uRXZlbnQgZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBSZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJlZ2luIHRoZSBwcm9ncmVzcyBzdGVwIHRpY2suXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaylTdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVuZGVyIGVsZW1lbnRzIGFuZCBzZXR1cCB0aGUgbGlzdGVuZXJzIGZvciBlYWNoIHNwcml0ZSBjbGljayBhcmVhLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicm9vdEVsXCI+PC9wYXJhbT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVuZGVyKFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHJvb3RFbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0cnVjdERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwiaW5zdHJ1Y3Rpb25zXCIgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aXRsZVNwYW4gPSBuZXcgUmV0eXBlZC5kb20uSFRNTFNwYW5FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwic3ByaXRlVGl0bGVcIixcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiQXVkaW8gU3ByaXRlIFZpc3VhbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVzY1NwYW4gPSBuZXcgUmV0eXBlZC5kb20uSFRNTFNwYW5FbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwiZGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IFwiQ2xpY2sgYSBzZWN0aW9uIG9mIHRoZSB3YXZlZm9ybSB0byBwbGF5IHRoZSBzcHJpdGUuXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3YXZlRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgaWQgPSBcIndhdmVmb3JtXCIgfTtcclxuICAgICAgICAgICAgdmFyIHNwcml0ZXNEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInNwcml0ZXNcIiB9O1xyXG5cclxuICAgICAgICAgICAgaW5zdHJ1Y3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnQ+KHRpdGxlU3Bhbik7XHJcbiAgICAgICAgICAgIGluc3RydWN0RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxCUkVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGluc3RydWN0RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTFNwYW5FbGVtZW50PihkZXNjU3Bhbik7XHJcblxyXG4gICAgICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oaW5zdHJ1Y3REaXYpO1xyXG4gICAgICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4od2F2ZURpdik7XHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzcHJpdGVzRGl2KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBzcHJpdGVOYW1lIGluIF9vcHRpb25zLlNwcml0ZU5hbWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaXRlRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBzdHJpbmcuRm9ybWF0KFwic3ByaXRlezB9XCIsY291bnQrKyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJzcHJpdGVcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVEaXYuYWRkRXZlbnRMaXN0ZW5lcjxzdHJpbmc+KFwiY2xpY2tcIiwgKGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lckZuPHN0cmluZz4pKGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQbGF5KHNwcml0ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaXRlTGFiZWxEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcInNwcml0ZS1sYWJlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IHNwcml0ZU5hbWVcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc3ByaXRlRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHNwcml0ZUxhYmVsRGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVzRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHNwcml0ZURpdik7XHJcblxyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZUVsbXMuQWRkKHNwcml0ZU5hbWUsIHNwcml0ZURpdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUGxheSBhIHNwcml0ZSB3aGVuIGNsaWNrZWQgYW5kIHRyYWNrIHRoZSBwcm9ncmVzcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNwcml0ZU5hbWVcIj5OYW1lIGluIGEgc3ByaXRlIG9iamVjdC48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFBsYXkoc3RyaW5nIHNwcml0ZU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBQbGF5IHRoZSBzcHJpdGUgc291bmQgYW5kIGNhcHR1cmUgdGhlIElELlxyXG4gICAgICAgICAgICB2YXIgaWQgPSBfc291bmQucGxheShzcHJpdGVOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHByb2dyZXNzIGVsZW1lbnQgYW5kIGJlZ2luIHZpc3VhbGx5IHRyYWNraW5nIGl0LlxyXG4gICAgICAgICAgICB2YXIgZWxtID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCksKF9vMSk9PntfbzEuaWQ9IGlkLlRvU3RyaW5nKCk7X28xLmNsYXNzTmFtZT0gXCJwcm9ncmVzc1wiO19vMS5kYXRhc2V0W0RhdGFTZXRTcHJpdGVQcm9wXT0gc3ByaXRlTmFtZTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICAgICAgX3Nwcml0ZUVsbXNbc3ByaXRlTmFtZV0uYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oZWxtKTtcclxuICAgICAgICAgICAgX3NvdW5kcy5BZGQoZWxtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gdGhpcyBzb3VuZCBpcyBmaW5pc2hlZCwgcmVtb3ZlIHRoZSBwcm9ncmVzcyBlbGVtZW50LlxyXG4gICAgICAgICAgICBfc291bmQub25jZShcImVuZFwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NvdW5kcy5SZW1vdmUoZWxtKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3ByaXRlRWxtc1tzcHJpdGVOYW1lXS5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihlbG0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSwgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdG9wIHBsYXlpbmcuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdG9wKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zb3VuZCE9bnVsbD9fc291bmQuc3RvcCgpOihIb3dsKW51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCBvbiB3aW5kb3cgcmVzaXplIHRvIGNvcnJlY3RseSBwc290aW9uIGFuZCBzaXplIHRoZSBjbGljayBvdmVybGF5cy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBzY2FsZSBvZiBvdXIgd2luZG93IGZyb20gXCJmdWxsXCIgc2l6ZS5cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gKFJldHlwZWQuZG9tLndpbmRvdyAuaW5uZXJXaWR0aCAtIDYwKSAvIDM2MDA7IC8vIDYwIGlzIG1hcmdpbiB3aWR0aFxyXG5cclxuICAgICAgICAgICAgLy8gUmVzaXplIGFuZCByZXBvc2l0aW9uIHRoZSBzcHJpdGUgb3ZlcmxheXMuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX29wdGlvbnMuU3ByaXRlTmFtZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVOYW1lID0gX29wdGlvbnMuU3ByaXRlTmFtZXNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaXRlID0gX3Nwcml0ZUVsbXNbc3ByaXRlTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnN0eWxlLndpZHRoID0gTWF0aC5Sb3VuZChfb3B0aW9ucy5XaWR0aFtpXSAqIChkb3VibGUpc2NhbGUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBfb3B0aW9ucy5MZWZ0Lkxlbmd0aCAmJiBfb3B0aW9ucy5MZWZ0W2ldID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3R5bGUubGVmdCA9IE1hdGguUm91bmQoX29wdGlvbnMuTGVmdFtpXSAqIChkb3VibGUpc2NhbGUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBzdGVwIGNhbGxlZCB3aXRoaW4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIHVwZGF0ZSB0aGUgcGxheWJhY2sgcG9zaXRpb25zLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFN0ZXAoZG91YmxlIHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIGFjdGl2ZSBzb3VuZHMgYW5kIHVwZGF0ZSB0aGVpciBwcm9ncmVzcyBiYXIuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBzb3VuZCBpbiBfc291bmRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBpbnQuUGFyc2Uoc291bmQuaWQsIDEwKTtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVOYW1lID0gKHN0cmluZykgc291bmQuZGF0YXNldFtEYXRhU2V0U3ByaXRlUHJvcF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gKEJyaWRnZS5TZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4pIF9vcHRpb25zLlNwcml0ZVtzcHJpdGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSByYW5nZS5JdGVtMTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VlayA9ICgoZG91YmxlPykgX3NvdW5kLnNlZWsoaWQpID8/IDApIC0gKG9mZnNldCAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgc291bmQuc3R5bGUud2lkdGggPSAoc2VlayAvIF9zb3VuZC5kdXJhdGlvbihpZCkgKiAxMDApICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaylTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
