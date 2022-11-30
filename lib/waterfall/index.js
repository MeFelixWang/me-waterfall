Component({
  options: {
    pureDataPattern: /^_/,
  },
  properties: {
    column: {type: Number, value: 2},
    gap: {type: Number, value: 15},
    width: {type: Number}
  },
  data: {
    _itemWidth: 0,
    _columnHeightArr: [],
    height: 0,
  },
  lifetimes: {
    attached() {
      const {width, gap, column} = this.data;
      if (typeof column !== "number" || !Number.isInteger(column) || column <= 0) {
        throw new Error("column must be a integer greater than zero!")
      }
      if (typeof gap !== "number" || gap < 0) {
        throw new Error("gap must be a number greater than or equal to zero!")
      }
      const updateSizes = {
        _columnHeightArr: Array.from({length: column}, () => 0),
      };
      if (typeof width === "number" && width > 0) {
        updateSizes._itemWidth = (width - gap * (column - 1)) / column;
        this.setData(updateSizes);
      } else {
        const query = this.createSelectorQuery();
        query
          .select(".me-waterfall")
          .boundingClientRect((res) => {
            if (res) {
              updateSizes._itemWidth = (res.width - gap * (column - 1)) / column;
              this.setData(updateSizes, () => {
                this.reflow();
              });
            }
          })
          .exec();
      }
    },
  },
  methods: {
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