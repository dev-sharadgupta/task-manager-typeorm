import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import type {
    Control,
    FieldPath,
    FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    renderInput: (field: any) => React.ReactNode;
}

export function TextField<T extends FieldValues>({
    control,
    name,
    label,
    required,
    icon,
    renderInput,
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                    </FormLabel>

                    <FormControl>
                        <div className="relative">
                            {icon && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {icon}
                                </span>
                            )}

                            {renderInput({
                                ...field,
                                className: icon ? "pl-10" : "pl-0",
                            })}
                        </div>
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
