import React from 'react'
import { APILoader, Marker, Map } from '@uiw/react-baidu-map';
export default function MapUtil() {
    return (
        <div style={{ width: '500px', height: '500px', border: '2px solid #ccc' }}>
            <APILoader akay="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f">
                <Map
                    ref={(props) => {
                        if (props && props.map) {
                            // 启用滚轮放大缩小，默认禁用
                            props.map.enableScrollWheelZoom();
                        }
                    }}
                    center={{ lng: 117.71053, lat: 39.096097 }}
                    zoom={18}
                >
                    <Marker position={{ lng: 117.71053, lat: 39.096097 }} type="blue1" />
                </Map>
            </APILoader>
        </div>
    )
}
