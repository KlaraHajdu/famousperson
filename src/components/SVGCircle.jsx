import React from "react";
import { SVGCircleStyle } from "../static/myStyle";

export default function SVGCircle(props) {
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

        return d;
    };

    return (
        <SVGCircleStyle>
            <svg className="countdown-svg">
                <path
                    style={{ fill: "none", stroke: "orange", strokeWidth: "4" }}
                    d={describeArc(50, 50, 48, 0, props.radius)}
                />
            </svg>
        </SVGCircleStyle>
    );
}
