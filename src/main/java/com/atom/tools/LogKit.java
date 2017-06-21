package com.atom.tools;

import com.atom.mvc.model.Syslog;
import com.atom.plugins.disruptor.DisruptorPlugin;
import com.atom.plugins.disruptor.LogEvent;
import com.lmax.disruptor.RingBuffer;

public class LogKit {
	public static void addLog(Syslog syslog){
		RingBuffer<LogEvent> buffer = DisruptorPlugin.buffer;
		long next = buffer.next();
		LogEvent log = buffer.get(next);
		log.setLog(syslog);
		buffer.publish(next);		
	}

}
