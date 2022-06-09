Component({
  options: {
    pureDataPattern: /^_/,
  },
  properties: {
    column: {type: Number, value: 2},
    gap: {type: Number, value: 15},
    width: {
      type: Number,
      observe() {
        this.reflow();
      },
    },
  },
  data: {
    _itemWidth: 0,
    _columnHeightArr: [],
    height: 0,
  },
  lifetimes: {
    attached() {
      const {width} = this.data;
      if (typeof width === "number" && width > 0) {
        this._initSizes(width);
      } else {
        const query = this.createSelectorQuery();
        query
          .select(".mini-waterfall")
          .boundingClientRect((res) => {
            if (res) {
              this._initSizes(res.width);
            }
          })
          .exec();
      }
    },
  },
  methods: {
    _initSizes(width) {
      const {gap, column} = this.data;
      if (typeof column !== "number" || !Number.isInteger(column) || column <= 0) {
        throw new Error("column must be a integer greater than zero!")
      }
      if (typeof gap !== "number" || gap < 0) {
        throw new Error("gap must be a number greater than or equal to zero!")
      }
      const itemWidth = (width - gap * (column - 1)) / column;
      const updateSizes = {
        _itemWidth: itemWidth,
        _columnHeightArr: Array.from({length: column}, () => 0),
      };
      this.setData(updateSizes);
    },
    reflow() {
      const {column, _itemWidth} = this.data;
      if (_itemWidth) {
        const _columnHeightArr = Array.from({length: column}, () => 0);
        const childList = this.getRelationNodes("../waterfall-item/index");
        this.setData({_columnHeightArr}, () => {
          childList.forEach((child) => {
            child._initSizes(this);
          });
        });
      }
    },
  },
  relations: {
    "../waterfall-item/index": {
      type: "child",
    },
  },
  externalClasses: ["custom-class"],
});
