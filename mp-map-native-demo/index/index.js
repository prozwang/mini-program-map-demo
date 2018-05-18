Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [],
    region: null,
    controls:[{
      id: 2,
      iconPath: 'null',
      position: {
        width: 500,
        height: 2000
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.getRegion({
      success: res => {
        console.log('change', res, '-----', this.data.latitude, this.data.longitude)
        this.setData({
          region: res
        })
      }
    })
    wx.getLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      },
      complete: (res) => {
        console.log('setdata',res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }, () => {
          this.setMarker()
        })
        
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  move: function () {
    console.log('move')
  },
  start: function () {
    console.log('start')
    this.setData({markers:[]})
  },
  end: function () {
    console.log('end')
    this.getCenterLocation()
  },
  setLocation: function() {
    this.setData({ 
      latitude: res.latitude, 
      longitude: res.longitude 
      })
  },
  changeRegion: function() {
    this.mapCtx.getRegion({
      success: res => {
        console.log('change', res,'-----',this.data.latitude,this.data.longitude)
        const region = this.data.region
        if (region.northeast.longitude === res.northeast.longitude &&
          region.northeast.latitude === res.northeast.latitude) {
            console.log('start', this.data.markers)

              this.start()
            
          } else {

              this.setData({
                region: res
              }, () => {
                this.end()
              })
              
            
          }
      }
    }) 
  },
  setMarker: function() {
    console.log('setmarker')
    this.setData({
      markers: [{
        id: 1,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        iconPath: '../image/icon_me.png',
        width: 24,
        height: 42,
        callout: {
          content: 'kkkkkmmm',
          color: '#ffffff',
          bgColor: '#202020',
          display: 'ALWAYS'
        },
        label: {
          content: 'mmmmmmmmm',
          fontSize: 16
        }
      }]
    })
  },
  regionChange: function() {
    console.log('change')
    this.getCenterLocation()
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:this.data.latitude,
        longitude:this.data.longitude,
      }]
    })
  },
  ct: function() {
    console.log('cttttttt')
  }
})
