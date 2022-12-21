Component({
  options: {
    pureDataPattern: /^_/,
  },
  data: {
    visibility: "hidden",
    top: 0,
    left: 0,
    width: 0,
  },
  methods: {
    _initSizes(waterfallInstance) {
      const {_itemWidth, gap, _columnHeightArr} = waterfallInstance.data;
      if (_itemWidth) {
        this.setData({width: _itemWidth}, () => {
          const query = this.createSelectorQuery();
          query
            .select(".me-waterfall-item")
            .boundingClientRect((res) => {
              if (res) {
                const {height} = res;
                const minHeight = Math.min(..._columnHeightArr);
                const maxHeight = Math.max(..._columnHeightArr);
                const minHeightIndex = _columnHeightArr.findIndex((item) => item === minHeight);
                const top = minHeight;
                const left = (_itemWidth + gap) * minHeightIndex;
                _columnHeightArr[minHeightIndex] += height;
                waterfallInstance.setData(
                  {height: Math.max(minHeight + height, maxHeight)},
                  () => {
                    this.setData({
                      width: _itemWidth,
                      top,
                      left,
                      visibility: "visible",
                    });
                  }
                );
              }
            })
            .exec();
        });
      }
    },
  },
  relations: {
    "../waterfall/index": {
      type: "parent",
      linked(waterfallInstance) {
        this._initSizes(waterfallInstance);
      },
    },
  },
  externalClasses: ["custom-class"],
});