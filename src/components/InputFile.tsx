import { useState, forwardRef, ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "./Button";
import axios from "axios";
import Dayjs from "dayjs";
import { toastShow, useToastDispatch } from "store";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  size: "xs" | "sm" | "md" | "lg";
  label: string;
  name: string;
  onChange?: any;
  allowType?: string;
  url: string;
  [x: string]: any;
}

export const InputFile = forwardRef(function (props: Props) {
  const { name, allowType = undefined, url, onChange } = props;
  let { label, placeholder } = props;
  label = (!label && placeholder && placeholder) || label;

  const path = Dayjs().format("YYYY/MM");
  const toastDispatch = useToastDispatch();

  const [fileName, setFileName] = useState<string>("");
  const [pathFileName, setPathFileName] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "completed">(
    "idle"
  );

  const inputProps = {
    ...props,
    name,
    id: `input-${name}`,
  };

  const cancelTokenSource = axios.CancelToken.source();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const extension = e?.target?.files[0]?.name.split(".").pop() || "";
    if (allowType && !allowType.split("|").includes(extension)) {
      toastShow(toastDispatch, {
        message: `File not allowed!\n
        Please upload ${allowType.replaceAll("|", ", ")}`,
        type: "error",
      });
      e.target.value = "";
      return false;
    }

    setStatus("loading");
    const formData = new FormData();
    formData.append("file", e?.target?.files[0]);
    formData.append("path", path);
    const { data: res } = await axios.post(`${url}/uploadfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      cancelToken: cancelTokenSource.token,
      onUploadProgress: (event) => {
        setPercentage(Math.round((event.loaded / event.total) * 100));
      },
    });
    onChange(res.data);
    setFileName(e.target.files[0].name);
    setPathFileName(res.data);
    setStatus("completed");
  };

  const handleRemove = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log({ fileName, pathFileName });
    await axios.delete(`${url}/deletefile`, { data: { file: pathFileName } });
    setStatus("idle");
    setFileName("");
    setPathFileName("");
    setPercentage(0);
  };

  return (
    <div className="form-group focused form-file">
      {label && (
        <label className="form-label" htmlFor={`input-${name}`}>
          {label}
        </label>
      )}
      {status === "idle" && (
        <IdleState
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          {...inputProps}
        />
      )}
      {status === "loading" && (
        <ProgressState
          percentage={percentage}
          onCancel={() => cancelTokenSource.cancel()}
        />
      )}
      {status === "completed" && (
        <CompleteState
          name={fileName}
          onRemove={(e: ChangeEvent<HTMLInputElement>) => handleRemove(e)}
        />
      )}
    </div>
  );
});

const IdleState = (props: any) => (
  <input type="file" className={`form-input--${props.size}`} {...props} />
);

const ProgressState = ({
  percentage,
  onCancel,
}: {
  percentage: number;
  onCancel: any;
}) => (
  <div className="progress-wrapper">
    <div className="progress-bar" style={{ width: percentage + "%" }}>
      <span>{percentage}%</span>
    </div>
    <div className="progress-btn-wrapper">
      <Button
        size="sm"
        variant="transparent"
        aria-label="Cancel upload"
        onClick={(e) => onCancel(e)}
      >
        <FaTimes />
      </Button>
    </div>
  </div>
);

const CompleteState = ({ name, onRemove }: { name: string; onRemove: any }) => (
  <div className="file-wrapper">
    <span>{name}</span>
    <Button
      size="sm"
      variant="primary"
      aria-label="Remove file"
      onClick={(e) => onRemove(e)}
    >
      <FaTimes />
    </Button>
  </div>
);
