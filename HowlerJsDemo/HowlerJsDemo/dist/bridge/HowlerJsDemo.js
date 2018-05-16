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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dsZXJKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlJhZGlvRGVtby9SYWRpby5jcyIsIlNwcml0ZURlbW8vU3ByaXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBZ0JZQSw0QkFBV0EsQUFBcUJBOztZQUVoQ0EsZUFBZUEsQUFBK0JBO1lBQzlDQSxnQkFBZ0JBLEFBQStCQTs7WUFFL0NBLG1CQUFtQkE7Z0JBRWZBLDJCQUFRQSxPQUFLQSxBQUFxQ0EsaUNBQWVBO2dCQUNqRUEsNEJBQVNBLE9BQUtBLEFBQXFDQSxrQ0FBZ0JBOztnQkFFbkVBO2dCQUNBQTs7O1lBR0pBLG9CQUFvQkE7Z0JBRWhCQSwyQkFBUUEsT0FBS0EsQUFBcUNBLGlDQUFlQTtnQkFDakVBLDRCQUFTQSxPQUFLQSxBQUFxQ0Esa0NBQWdCQTs7Z0JBRW5FQTtnQkFDQUE7OztZQUlKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQVVBQSxJQUFJQSw2QkFBWUE7d0JBRVpBLHNDQUF5REE7OztvQkFJN0RBLDRCQUFXQTs7b0JBTVhBLHNDQUF5REE7O29CQUV6REEsMEJBQVNBLElBQUlBLDZCQUFNQSwyQkFBVUEsbUJBRXpCQSxVQUFJQSxpR0FJVUEsbUJBRU5BLFdBQUlBLDRIQUNKQSxXQUFJQSwyS0FHWkEsVUFBSUEsaUdBSVVBLG1CQUVOQSxXQUFJQSw0SEFDSkEsV0FBSUEsMktBR1pBLFVBQUlBLDhGQUlVQSxtQkFFTkEsV0FBSUEseUhBQ0pBLFdBQUlBLHdLQUdaQSxVQUFJQSxrR0FJVUEsbUJBRU5BLFdBQUlBLHVIQUNKQSxXQUFJQSxxS0FHWkEsVUFBSUEsOEZBSVVBLG1CQUVOQSxXQUFJQSx3SEFDSkEsV0FBSUE7Ozs7Ozs7Ozs7Ozs7b0JBZWhCQSxJQUFJQSw2QkFBWUE7d0JBRVpBLHNDQUF5REE7OztvQkFJN0RBLDRCQUFXQTs7b0JBS1hBLHNDQUF5REE7O29CQUV6REEs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QUNBLE9BQVVBLGlCQUFZQSxtQkFBdEJBLFlBQWtDQSxDQUFDQTt3QkFDL0NBLG9CQUFvQkEsc0JBQUNBLE9BQU9BLHFCQUFnQkE7Ozs7Ozs7Z0JBR2hEQSxzQkFBa0NBLEFBQTBDQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEhvd2xlckpzRGVtby5SYWRpb0RlbW87XHJcbnVzaW5nIEhvd2xlckpzRGVtby5TcHJpdGVEZW1vO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEhvd2xlckpzRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgX3Jvb3REaXY7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5kb20uRWxlbWVudCBfY29udGVudDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSYWRpbyBfcmFkaW87XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgU3ByaXRlIF9zcHJpdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250ZW50ID0gKFJldHlwZWQuZG9tLkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxzdHJpbmc+KFwiI2NvbnRlbnRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnRuUmFkaW8gPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxzdHJpbmc+KFwiI2J0blJhZGlvXCIpO1xyXG4gICAgICAgICAgICB2YXIgYnRuU3ByaXRlID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNidG5TcHJpdGVcIik7XHJcblxyXG4gICAgICAgICAgICBidG5SYWRpby5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3JhZGlvIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fcmFkaW8uU3RvcCgpKTpudWxsO1xyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+X3Nwcml0ZS5TdG9wKCkpOm51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgUmVuZGVyUmFkaW8oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYnRuU3ByaXRlLm9uY2xpY2sgPSBldiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcmFkaW8hPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pl9yYWRpby5TdG9wKCkpOm51bGw7XHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5fc3ByaXRlLlN0b3AoKSk6bnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBSZW5kZXJTcHJpdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIFJhZGlvIHNhbXBsZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIFJlbmRlclJhZGlvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjcmVnaW9uIFJhZGlvIERlbW9cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwczovL2dpdGh1Yi5jb20vZ29sZGZpcmUvaG93bGVyLmpzL2Jsb2IvZGYzYWE0MzgwNmU1ZTM5MzMxMjI1NDk0NmUzNmE0NTE0ZTNhOGY0ZC9leGFtcGxlcy9yYWRpby9yYWRpby5qc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW5kZXJSYWRpbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3REaXYgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2NvbnRlbnQucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm9vdCBEaXYgdG8gdGhlIERvY3VtZW50XHJcbiAgICAgICAgICAgIF9yb290RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwicmFkaW9Sb290XCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHtwYWRkaW5nID0gXCIxMDBweFwifVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX2NvbnRlbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG5cclxuICAgICAgICAgICAgX3JhZGlvID0gbmV3IFJhZGlvKF9yb290RGl2LCBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRnJlcSA9IFwiODEuNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gXCJHcm9vdmUgU2FsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VzID0gbmV3W11cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9ncm9vdmVzYWxhZC0xMjgtbXAzXCIsIEZvcm1hdCA9IFwibXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vZ3Jvb3Zlc2FsYWQtMTI4LWFhY1wiLCBGb3JtYXQgPSBcImFhY1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRnJlcSA9IFwiODkuOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gXCJTZWNyZXQgQWdlbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VzID0gbmV3W11cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9zZWNyZXRhZ2VudC0xMjgtbXAzXCIsIEZvcm1hdCA9IFwibXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vc2VjcmV0YWdlbnQtMTI4LWFhY1wiLCBGb3JtYXQgPSBcImFhY1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRnJlcSA9IFwiOTguOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gXCJJbmRpZSBQb3BcIixcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VzID0gbmV3W11cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTEuc29tYWZtLmNvbS9pbmRpZXBvcC0xMjgtbXAzXCIsIEZvcm1hdCA9IFwibXAzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vaW5kaWVwb3AtMTI4LWFhY1wiLCBGb3JtYXQgPSBcImFhY1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRnJlcSA9IFwiMTAzLjNcIixcclxuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IFwiUG9saWNlIFJhZGlvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgU291cmNlcyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmFkaW9TdGF0aW9uU3JjIHtVcmwgPSBcImh0dHA6Ly9pY2UxLnNvbWFmbS5jb20vc2YxMDMzLTEyOC1tcDNcIiwgRm9ybWF0ID0gXCJtcDNcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25TcmMge1VybCA9IFwiaHR0cDovL2ljZTIuc29tYWZtLmNvbS9zZjEwMzMtNjQtYWFjXCIsIEZvcm1hdCA9IFwiYWFjXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5ldyBSYWRpb1N0YXRpb25cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGcmVxID0gXCIxMDcuN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gXCJUaGUgVHJpcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMS5zb21hZm0uY29tL3RoZXRyaXAtMTI4LW1wM1wiLCBGb3JtYXQgPSBcIm1wM1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhZGlvU3RhdGlvblNyYyB7VXJsID0gXCJodHRwOi8vaWNlMi5zb21hZm0uY29tL3RoZXRyaXAtNjQtYWFjXCIsIEZvcm1hdCA9IFwiYWFjXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBTcHJpdGUgRGVtb1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9nb2xkZmlyZS9ob3dsZXIuanMvYmxvYi9kZjNhYTQzODA2ZTVlMzkzMzEyMjU0OTQ2ZTM2YTQ1MTRlM2E4ZjRkL2V4YW1wbGVzL3Nwcml0ZS9zcHJpdGUuanNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVuZGVyU3ByaXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcm9vdERpdiAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29udGVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb290IERpdiB0byB0aGUgRG9jdW1lbnRcclxuICAgICAgICAgICAgX3Jvb3REaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJzcHJpdGVSb290XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIF9jb250ZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuXHJcbiAgICAgICAgICAgIF9zcHJpdGUgPSBuZXcgU3ByaXRlKF9yb290RGl2LCBuZXcgU3ByaXRlT3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXaWR0aCA9IG5ld1tdIHs3OCwgNjAsIDYyLCA3MCwgNjIsIDE4OTV9LFxyXG4gICAgICAgICAgICAgICAgTGVmdCA9IG5ld1tdIHswLCAzNDIsIDY4MCwgMTAyMiwgMTM2MX0sXHJcbiAgICAgICAgICAgICAgICAvL1NyYyA9IG5ld1tdIHtcInNvdW5kMi53ZWJtXCIsIFwic291bmQyLm1wM1wifSxcclxuICAgICAgICAgICAgICAgIFNyYyA9IG5ld1tdIHtcclxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SZXR5cGVkL0RlbW9zL21hc3Rlci9Ib3dsZXJKc0RlbW8vSG93bGVySnNEZW1vL2Rpc3QvYXNzZXRzL2F1ZGlvL3NvdW5kMi53ZWJtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUmV0eXBlZC9EZW1vcy9tYXN0ZXIvSG93bGVySnNEZW1vL0hvd2xlckpzRGVtby9kaXN0L2Fzc2V0cy9hdWRpby9zb3VuZDIubXAzXCIgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgU3ByaXRlID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IGhvd2xlci5JSG93bFNvdW5kU3ByaXRlRGVmaW5pdGlvbigpLChfbzEpPT57X28xW1wib25lXCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDAsIDQ1MCk7X28xW1widHdvXCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDIwMDAsIDI1MCk7X28xW1widGhyZWVcIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oNDAwMCwgMzUwKTtfbzFbXCJmb3VyXCJdPSBuZXcgU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KDYwMDAsIDM4MCk7X28xW1wiZml2ZVwiXT0gbmV3IFNlcXVlbmNlPGRvdWJsZSwgZG91YmxlPig4MDAwLCAzNDApO19vMVtcImJlYXRcIl09IG5ldyBTZXF1ZW5jZTxkb3VibGUsIGRvdWJsZT4oMTAwMDAsIDExMTYzKTtyZXR1cm4gX28xO30pLFxyXG4gICAgICAgICAgICAgICAgU3ByaXRlTmFtZXMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwib25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0d29cIixcclxuICAgICAgICAgICAgICAgICAgICBcInRocmVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmb3VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmaXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJiZWF0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dsZXJKc0RlbW8uUmFkaW9EZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBSYWRpbyBjbGFzcyBjb250YWluaW5nIHRoZSBzdGF0ZSBvZiBvdXIgc3RhdGlvbnMuXHJcbiAgICAvLy8gSW5jbHVkZXMgYWxsIG1ldGhvZHMgZm9yIHBsYXlpbmcsIHN0b3BwaW5nLCBldGMuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFJhZGlvXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSYWRpb1N0YXRpb25bXSBfc3RhdGlvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSYWRpb1N0YXRpb25SZW5kZXJJbmZvW10gX3JlbmRlckluZm87XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2luZGV4O1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEluaXRzIFJhZGlvIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHN0YXRlIG9mIG91ciBzdGF0aW9ucy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJvb3RFbFwiPkhUTUwgRWxlbWVudCB3aWxsIGJlIHVzaW5nIGFzIGEgcm9vdCBlbGVtZW50IGZvciByZW5kZXJpbmcuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdGF0aW9uc1wiPkFycmF5IG9mIG9iamVjdHMgd2l0aCBzdGF0aW9uIGRldGFpbHMuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgUmFkaW8oUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdEVsLCBSYWRpb1N0YXRpb25bXSBzdGF0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIF9zdGF0aW9ucyA9IHN0YXRpb25zO1xyXG4gICAgICAgICAgICBfcmVuZGVySW5mbyA9IG5ldyBSYWRpb1N0YXRpb25SZW5kZXJJbmZvW3N0YXRpb25zLkxlbmd0aF07XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgZGlzcGxheSBmb3IgZWFjaCBzdGF0aW9uLlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRpb25zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgc3RhdGlvbjpcclxuICAgICAgICAgICAgICAgIF9yZW5kZXJJbmZvW2ldID0gUmVuZGVyKHJvb3RFbCwgc3RhdGlvbnNbaV0sIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbmRlciBzdGF0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBSYWRpb1N0YXRpb25SZW5kZXJJbmZvIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290RWwsIFJhZGlvU3RhdGlvbiBzdGF0aW9uLCBpbnQgc3RhdGlvbkluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRpb25EaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQge2NsYXNzTmFtZSA9IFwic3RhdGlvblwifTtcclxuICAgICAgICAgICAgdmFyIHRpdGxlRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJ0aXRsZVwiIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgc3VidGl0bGVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInN1YnRpdGxlXCIgfTtcclxuICAgICAgICAgICAgdmFyIGxpdmVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcImxpdmVcIiwgaW5uZXJIVE1MID0gXCJMSVZFXCJ9O1xyXG4gICAgICAgICAgICB2YXIgcGxheWluZ0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicGxheWluZ1wiIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVjdDFEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInJlY3QxXCIgfTtcclxuICAgICAgICAgICAgdmFyIHJlY3QyRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJyZWN0MlwiIH07XHJcbiAgICAgICAgICAgIHZhciByZWN0M0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwicmVjdDNcIiB9O1xyXG4gICAgICAgICAgICB2YXIgcmVjdDREaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBjbGFzc05hbWUgPSBcInJlY3Q0XCIgfTtcclxuICAgICAgICAgICAgdmFyIHJlY3Q1RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJyZWN0NVwiIH07XHJcblxyXG4gICAgICAgICAgICBwbGF5aW5nRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHJlY3QxRGl2KTtcclxuICAgICAgICAgICAgcGxheWluZ0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihyZWN0MkRpdik7XHJcbiAgICAgICAgICAgIHBsYXlpbmdEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4ocmVjdDNEaXYpO1xyXG4gICAgICAgICAgICBwbGF5aW5nRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHJlY3Q0RGl2KTtcclxuICAgICAgICAgICAgcGxheWluZ0Rpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihyZWN0NURpdik7XHJcblxyXG4gICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdWJ0aXRsZURpdik7XHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGxpdmVEaXYpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihwbGF5aW5nRGl2KTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRpb25EaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4odGl0bGVEaXYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlbmRlckluZm8gPSBuZXcgUmFkaW9TdGF0aW9uUmVuZGVySW5mb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTdGF0aW9uID0gc3RhdGlvbkRpdixcclxuICAgICAgICAgICAgICAgIFRpdGxlID0gc3VidGl0bGVEaXYsXHJcbiAgICAgICAgICAgICAgICBMaXZlID0gbGl2ZURpdixcclxuICAgICAgICAgICAgICAgIFBsYXlpbmcgPSBwbGF5aW5nRGl2XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZW5kZXJJbmZvLlRpdGxlLmlubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCI8Yj57MH08L2I+IHsxfVwiLHN0YXRpb24uRnJlcSxzdGF0aW9uLlRpdGxlKTtcclxuICAgICAgICAgICAgcmVuZGVySW5mby5TdGF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc05vdFBsYXlpbmcgPSBzdGF0aW9uLkhvd2wgPT0gbnVsbCB8fCAhc3RhdGlvbi5Ib3dsLnBsYXlpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdG9wIG90aGVyIHNvdW5kcyBvciB0aGUgY3VycmVudCBvbmUuXHJcbiAgICAgICAgICAgICAgICBTdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHN0YXRpb24gaXNuJ3QgYWxyZWFkeSBwbGF5aW5nIG9yIGl0IGRvZXNuJ3QgZXhpc3QsIHBsYXkgaXQuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGlvbi5Ib3dsID09IG51bGwgfHwgaXNOb3RQbGF5aW5nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXkoc3RhdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgcm9vdEVsLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHN0YXRpb25EaXYpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlckluZm87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBsYXkgYSBzdGF0aW9uIHdpdGggYSBzcGVjaWZpYyBpbmRleC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN0YXRpb25JbmRleFwiPkluZGV4IGluIHRoZSBhcnJheSBvZiBzdGF0aW9ucy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFBsYXkoaW50PyBzdGF0aW9uSW5kZXggPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3RhdGlvbkluZGV4ID8/IF9pbmRleDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3N0YXRpb25zW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIGFscmVhZHkgbG9hZGVkIHRoaXMgdHJhY2ssIHVzZSB0aGUgY3VycmVudCBvbmUuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgc2V0dXAgYW5kIGxvYWQgYSBuZXcgSG93bC5cclxuICAgICAgICAgICAgaWYgKGRhdGEuSG93bCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3JjQXJyYXkgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxnbG9iYWw6Okhvd2xlckpzRGVtby5SYWRpb0RlbW8uUmFkaW9TdGF0aW9uU3JjLHN0cmluZz4oZGF0YS5Tb3VyY2VzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SG93bGVySnNEZW1vLlJhZGlvRGVtby5SYWRpb1N0YXRpb25TcmMsIHN0cmluZz4pKHggPT4geC5VcmwpKS5Ub0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0QXJyYXkgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxnbG9iYWw6Okhvd2xlckpzRGVtby5SYWRpb0RlbW8uUmFkaW9TdGF0aW9uU3JjLHN0cmluZz4oZGF0YS5Tb3VyY2VzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SG93bGVySnNEZW1vLlJhZGlvRGVtby5SYWRpb1N0YXRpb25TcmMsIHN0cmluZz4pKHggPT4geC5Gb3JtYXQpKS5Ub0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5Ib3dsID0gbmV3IFJldHlwZWQuaG93bGVyLkhvd2wobmV3IFJldHlwZWQuaG93bGVyLklIb3dsUHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHNyY0FycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1ID0gdHJ1ZSwgICAvLyBBIGxpdmUgc3RyZWFtIGNhbiBvbmx5IGJlIHBsYXllZCB0aHJvdWdoIEhUTUw1IEF1ZGlvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdEFycmF5XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQmVnaW4gcGxheWluZyB0aGUgc291bmQuXHJcbiAgICAgICAgICAgIGRhdGEuSG93bC5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgdGhlIGRpc3BsYXkuXHJcbiAgICAgICAgICAgIFRvZ2dsZVN0YXRpb25EaXNwbGF5KGluZGV4LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIGluZGV4IHdlIGFyZSBjdXJyZW50bHkgcGxheWluZy5cclxuICAgICAgICAgICAgX2luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN0b3AgYSBzdGF0aW9uJ3MgbGl2ZSBzdHJlYW0uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdG9wKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgSG93bCB3ZSB3YW50IHRvIG1hbmlwdWxhdGUuXHJcbiAgICAgICAgICAgIHZhciBzb3VuZCA9IF9zdGF0aW9uc1tfaW5kZXhdLkhvd2w7XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgdGhlIGRpc3BsYXkuXHJcbiAgICAgICAgICAgIFRvZ2dsZVN0YXRpb25EaXNwbGF5KF9pbmRleCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RvcCB0aGUgc291bmQuXHJcbiAgICAgICAgICAgIHNvdW5kIT1udWxsP3NvdW5kLnN0b3AoKTooUmV0eXBlZC5QcmltaXRpdmUuVGhpczxIb3dsPiludWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUb2dnbGUgdGhlIGRpc3BsYXkgb2YgYSBzdGF0aW9uIHRvIG9mZi9vbi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImluZGV4XCI+SW5kZXggb2YgdGhlIHN0YXRpb24gdG8gdG9nZ2xlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3RhdGVcIj50cnVlIGlzIG9uIGFuZCBmYWxzZSBpcyBvZmYuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUb2dnbGVTdGF0aW9uRGlzcGxheShpbnQgaW5kZXgsIGJvb2wgc3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBIaWdobGlnaHQvdW4taGlnaGxpZ2h0IHRoZSByb3cuXHJcbiAgICAgICAgICAgIF9yZW5kZXJJbmZvW2luZGV4XS5TdGF0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0YXRlID8gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMzMpXCIgOiBzdHJpbmcuRW1wdHk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93L2hpZGUgdGhlIFwibGl2ZVwiIG1hcmtlci5cclxuICAgICAgICAgICAgX3JlbmRlckluZm9baW5kZXhdLkxpdmUuc3R5bGUub3BhY2l0eSA9IHN0YXRlID8gXCIxXCIgOiBcIjBcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cvaGlkZSB0aGUgXCJwbGF5aW5nXCIgYW5pbWF0aW9uLlxyXG4gICAgICAgICAgICBfcmVuZGVySW5mb1tpbmRleF0uUGxheWluZy5zdHlsZS5kaXNwbGF5ID0gc3RhdGUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEhvd2xlckpzRGVtby5TcHJpdGVEZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBTcHJpdGUgY2xhc3MgY29udGFpbmluZyB0aGUgc3RhdGUgb2Ygb3VyIHNwcml0ZXMgdG8gcGxheSBhbmQgdGhlaXIgcHJvZ3Jlc3MuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3Qgc3RyaW5nIERhdGFTZXRTcHJpdGVQcm9wID0gXCJzcHJpdGVcIjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBTcHJpdGVPcHRpb25zIF9vcHRpb25zO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQuaG93bGVyLkhvd2wgX3NvdW5kO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4gX3NvdW5kcyA9IG5ldyBMaXN0PFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PigpO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PiBfc3ByaXRlRWxtcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KCk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSW5pdHMgYSBuZXcgU3ByaXRlIG9iamVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJvb3RFbFwiPlJvb3QgSFRNTCBlbGVtZW50IHdoZXJlIHNwcml0ZXMgd2lsbCBiZSByZW5kZXJlZC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj5TZXR0aW5ncyB0byBwYXNzIGludG8gYW5kIHNldHVwIHRoZSBzb3VuZCBhbmQgdmlzdWFscy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBTcHJpdGUoUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgcm9vdEVsLCAgU3ByaXRlT3B0aW9ucyBvcHRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIG9wdGlvbnMgdG8gZGVmaW5lIHRoaXMgc3ByaXRlIGRpc3BsYXkuXHJcbiAgICAgICAgICAgIF9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICAgICAgUmVuZGVyKHJvb3RFbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgb3VyIGF1ZGlvIHNwcml0ZSBkZWZpbml0aW9uLlxyXG4gICAgICAgICAgICBfc291bmQgPSBuZXcgUmV0eXBlZC5ob3dsZXIuSG93bCggbmV3IFJldHlwZWQuaG93bGVyLklIb3dsUHJvcGVydGllc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmMgPSBvcHRpb25zLlNyYyxcclxuICAgICAgICAgICAgICAgIHNwcml0ZSA9IG9wdGlvbnMuU3ByaXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgYSByZXNpemUgZXZlbnQgYW5kIGZpcmUgaXQgdG8gc2V0dXAgb3VyIHNwcml0ZSBvdmVybGF5cy5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50PikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZXNpemUoKTtcclxuICAgICAgICAgICAgfSksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIFJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQmVnaW4gdGhlIHByb2dyZXNzIHN0ZXAgdGljay5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKChnbG9iYWw6OlJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrKVN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZW5kZXIgZWxlbWVudHMgYW5kIHNldHVwIHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggc3ByaXRlIGNsaWNrIGFyZWEuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyb290RWxcIj48L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgcm9vdEVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluc3RydWN0RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50IHsgY2xhc3NOYW1lID0gXCJpbnN0cnVjdGlvbnNcIiB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpdGxlU3BhbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJzcHJpdGVUaXRsZVwiLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gXCJBdWRpbyBTcHJpdGUgVmlzdWFsXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXNjU3BhbiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gXCJDbGljayBhIHNlY3Rpb24gb2YgdGhlIHdhdmVmb3JtIHRvIHBsYXkgdGhlIHNwcml0ZS5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHdhdmVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgeyBpZCA9IFwid2F2ZWZvcm1cIiB9O1xyXG4gICAgICAgICAgICB2YXIgc3ByaXRlc0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCB7IGNsYXNzTmFtZSA9IFwic3ByaXRlc1wiIH07XHJcblxyXG4gICAgICAgICAgICBpbnN0cnVjdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxTcGFuRWxlbWVudD4odGl0bGVTcGFuKTtcclxuICAgICAgICAgICAgaW5zdHJ1Y3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaW5zdHJ1Y3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnQ+KGRlc2NTcGFuKTtcclxuXHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihpbnN0cnVjdERpdik7XHJcbiAgICAgICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pih3YXZlRGl2KTtcclxuICAgICAgICAgICAgcm9vdEVsLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHNwcml0ZXNEaXYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHNwcml0ZU5hbWUgaW4gX29wdGlvbnMuU3ByaXRlTmFtZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IHN0cmluZy5Gb3JtYXQoXCJzcHJpdGV7MH1cIixjb3VudCsrKSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcInNwcml0ZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZURpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50PikoZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXkoc3ByaXRlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGVMYWJlbERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwic3ByaXRlLWxhYmVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MID0gc3ByaXRlTmFtZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3ByaXRlTGFiZWxEaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZXNEaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3ByaXRlRGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlRWxtcy5BZGQoc3ByaXRlTmFtZSwgc3ByaXRlRGl2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQbGF5IGEgc3ByaXRlIHdoZW4gY2xpY2tlZCBhbmQgdHJhY2sgdGhlIHByb2dyZXNzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3ByaXRlTmFtZVwiPk5hbWUgaW4gYSBzcHJpdGUgb2JqZWN0LjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgUGxheShzdHJpbmcgc3ByaXRlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFBsYXkgdGhlIHNwcml0ZSBzb3VuZCBhbmQgY2FwdHVyZSB0aGUgSUQuXHJcbiAgICAgICAgICAgIHZhciBpZCA9IF9zb3VuZC5wbGF5KHNwcml0ZU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcHJvZ3Jlc3MgZWxlbWVudCBhbmQgYmVnaW4gdmlzdWFsbHkgdHJhY2tpbmcgaXQuXHJcbiAgICAgICAgICAgIHZhciBlbG0gPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKSwoX28xKT0+e19vMS5pZD0gaWQuVG9TdHJpbmcoKTtfbzEuY2xhc3NOYW1lPSBcInByb2dyZXNzXCI7X28xLmRhdGFzZXRbRGF0YVNldFNwcml0ZVByb3BdPSBzcHJpdGVOYW1lO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgICAgICBfc3ByaXRlRWxtc1tzcHJpdGVOYW1lXS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihlbG0pO1xyXG4gICAgICAgICAgICBfc291bmRzLkFkZChlbG0pO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB0aGlzIHNvdW5kIGlzIGZpbmlzaGVkLCByZW1vdmUgdGhlIHByb2dyZXNzIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIF9zb3VuZC5vbmNlKFwiZW5kXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc291bmRzLlJlbW92ZShlbG0pKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zcHJpdGVFbG1zW3Nwcml0ZU5hbWVdLnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KGVsbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLCBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN0b3AgcGxheWluZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN0b3AoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NvdW5kIT1udWxsP19zb3VuZC5zdG9wKCk6KFJldHlwZWQuUHJpbWl0aXZlLlRoaXM8SG93bD4pbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsbGVkIG9uIHdpbmRvdyByZXNpemUgdG8gY29ycmVjdGx5IHBzb3Rpb24gYW5kIHNpemUgdGhlIGNsaWNrIG92ZXJsYXlzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlIG9mIG91ciB3aW5kb3cgZnJvbSBcImZ1bGxcIiBzaXplLlxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAoUmV0eXBlZC5kb20ud2luZG93IC5pbm5lcldpZHRoIC0gNjApIC8gMzYwMDsgLy8gNjAgaXMgbWFyZ2luIHdpZHRoXHJcblxyXG4gICAgICAgICAgICAvLyBSZXNpemUgYW5kIHJlcG9zaXRpb24gdGhlIHNwcml0ZSBvdmVybGF5cy5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfb3B0aW9ucy5TcHJpdGVOYW1lcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBfb3B0aW9ucy5TcHJpdGVOYW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBzcHJpdGUgPSBfc3ByaXRlRWxtc1tzcHJpdGVOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3R5bGUud2lkdGggPSBNYXRoLlJvdW5kKF9vcHRpb25zLldpZHRoW2ldICogc2NhbGUpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBfb3B0aW9ucy5MZWZ0Lkxlbmd0aCAmJiBfb3B0aW9ucy5MZWZ0W2ldID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3R5bGUubGVmdCA9IE1hdGguUm91bmQoX29wdGlvbnMuTGVmdFtpXSAqIHNjYWxlKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgc3RlcCBjYWxsZWQgd2l0aGluIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0byB1cGRhdGUgdGhlIHBsYXliYWNrIHBvc2l0aW9ucy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTdGVwKGRvdWJsZSB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBhY3RpdmUgc291bmRzIGFuZCB1cGRhdGUgdGhlaXIgcHJvZ3Jlc3MgYmFyLlxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgc291bmQgaW4gX3NvdW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gaW50LlBhcnNlKHNvdW5kLmlkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaXRlTmFtZSA9IChzdHJpbmcpIHNvdW5kLmRhdGFzZXRbRGF0YVNldFNwcml0ZVByb3BdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IChCcmlkZ2UuU2VxdWVuY2U8ZG91YmxlLCBkb3VibGU+KSBfb3B0aW9ucy5TcHJpdGVbc3ByaXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gcmFuZ2UuSXRlbTE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNlZWsgPSAoKGRvdWJsZT8pIF9zb3VuZC5zZWVrKGlkKSA/PyAwKSAtIChvZmZzZXQgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHNvdW5kLnN0eWxlLndpZHRoID0gKHNlZWsgLyBfc291bmQuZHVyYXRpb24oaWQpICogMTAwKSArIFwiJVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGdsb2JhbDo6UmV0eXBlZC5kb20uRnJhbWVSZXF1ZXN0Q2FsbGJhY2spU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
