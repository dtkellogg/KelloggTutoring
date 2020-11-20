import React from "react";
import PropTypes from "prop-types";

const styles = {
    content: {
        fontSize: "15px",
        position: "absolute",
        left: "0",
        right: "0",
        margin: "10rem",
        textAlign: "center",
    },
};

export default function Loading({ text = "Loading", speed = 300 }) {
    const [content, setContent] = React.useState(text);

    React.useEffect(() => {
      if (content !== "Loading") {
        document.title = content

      }
    })

    console.log(content)

    React.useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...` ? text : `${content}.`;
            });
        }, speed);

        return () => window.clearInterval(id);
    }, [text, speed]);

    return <p style={styles.content}>{content}</p>;
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
};
